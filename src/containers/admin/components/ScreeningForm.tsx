import {
    SubmitHandler,
    useForm,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import type {
    ICinema,
    IHallShortForm,
    IMovieShortForm,
    IScreeningFormData
} from "../../../types/types.ts";
import { useEffect, useState } from "react";
import Select from "react-select";
import useCinemas from "../../../hooks/useCinemas.ts";

interface ICreateFormInputs {
    register: UseFormRegister<IScreeningFormData>;
    cinemas: ICinema[];
    getMovies: (cinemaId: number) => Promise<IMovieShortForm[] | undefined>;
    setValue: UseFormSetValue<IScreeningFormData>;
    getHalls: (cinemaId: number) => Promise<IHallShortForm[] | undefined>;
}
interface ISelectOption {
    value: number;
    label: string;
}
function CreateFormSelects({
    getMovies,
    cinemas,
    setValue,
    getHalls
}: ICreateFormInputs) {
    const [movies, setMovies] = useState<IMovieShortForm[]>([]);
    const [halls, setHalls] = useState<IHallShortForm[]>([]);
    const [selectedCinemaOption, setSelectedCinemaOption] =
        useState<ISelectOption>({ value: -1, label: "Vælg en biograf" });
    const [selectedMovieOption, setSelectedMovieOption] =
        useState<ISelectOption>({ value: -1, label: "Vælg en film" });
    const [selectedHallOption, setSelectedHallOption] = useState<ISelectOption>(
        { value: -1, label: "Vælg en sal" }
    );

    useEffect(() => {
        setSelectedMovieOption({ value: -1, label: "Vælg en film" });
        setSelectedHallOption({ value: -1, label: "Vælg en sal" });
    }, [selectedCinemaOption]);

    return (
        <>
            <label>
                <span className="font-semibold">Biograf</span>
                <Select
                    options={cinemas.map((cinema) => ({
                        value: cinema.id,
                        label: cinema.name
                    }))}
                    isSearchable={true}
                    value={selectedCinemaOption}
                    onChange={async (cinema) => {
                        if (!cinema) return;
                        const foundCinema = cinemas.find(
                            (c) => c.id === cinema.value
                        );
                        if (foundCinema) {
                            setSelectedCinemaOption({
                                value: foundCinema.id,
                                label: foundCinema.name
                            });
                        }
                        const movies = await getMovies(cinema.value);
                        const halls = await getHalls(cinema.value);
                        setMovies(movies ?? []);
                        setHalls(halls ?? []);
                        setValue(
                            "cinema",
                            cinemas.find((c) => {
                                return c.id === cinema.value;
                            })
                        );
                        setValue("movie", undefined);
                        setValue("hall", undefined);
                    }}
                />
            </label>
            {selectedCinemaOption.value !== -1 && (
                <>
                    <label>
                        <span className="font-semibold">Film</span>
                        <Select
                            value={selectedMovieOption}
                            isSearchable={true}
                            options={movies.map((movie) => ({
                                value: movie.id,
                                label: movie.title
                            }))}
                            onChange={(movie) => {
                                if (!movie) return;
                                const foundMovie = movies.find(
                                    (m) => m.id === movie.value
                                );
                                if (foundMovie) {
                                    setSelectedMovieOption({
                                        value: foundMovie.id,
                                        label: foundMovie.title
                                    });
                                    setValue("movie", foundMovie);
                                }
                            }}
                        />
                    </label>
                    <label>
                        <span className="font-semibold">Sal</span>
                        <Select
                            value={selectedHallOption}
                            options={halls.map((hall) => ({
                                value: hall.id,
                                label: `Sal ${hall.number}`
                            }))}
                            onChange={(hall) => {
                                if (!hall) return;
                                setSelectedHallOption({
                                    value: hall.value,
                                    label: hall.label
                                });
                                setValue(
                                    "hall",
                                    halls.find((h) => h.id === hall.value)
                                );
                            }}
                        />
                    </label>
                </>
            )}
        </>
    );
}

interface IScreeningFormProps {
    onSubmit: SubmitHandler<IScreeningFormData>;
    title: string;
}
function ScreeningForm({ onSubmit, title }: IScreeningFormProps) {
    const { cinemas, getHallsByCinemaId, getMoviesByCinemaId } = useCinemas();
    const { register, handleSubmit, setValue, reset } =
        useForm<IScreeningFormData>();

    const submitForm: SubmitHandler<IScreeningFormData> = async (data) => {
        await onSubmit(data);
        reset();
    };
    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col gap-4"
        >
            <div className="text-2xl">{title}</div>
            <CreateFormSelects
                register={register}
                getMovies={getMoviesByCinemaId}
                getHalls={getHallsByCinemaId}
                cinemas={cinemas}
                setValue={setValue}
            />
            <label>
                <span className="font-semibold">Dato</span>
                <input
                    type="date"
                    {...register("date", { required: true })}
                    className="p-1 border ml-2"
                />
            </label>
            <label>
                <span className="font-semibold">Tidspunkt</span>
                <input
                    type="time"
                    {...register("time", { required: true })}
                    className="p-1 border ml-2"
                />
            </label>
            <label className="flex justify-end">
                <input
                    type="checkbox"
                    {...register("is3d")}
                    className="p-1 mr-2 w-4"
                />
                <span className="font-semibold">3D</span>
            </label>
            <button
                type="submit"
                className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Opret
            </button>
        </form>
    );
}

export default ScreeningForm;
