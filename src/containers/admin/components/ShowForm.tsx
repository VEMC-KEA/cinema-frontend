import {
    SubmitHandler,
    useForm,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import type { ICinema, IMovie, IShowFormData } from "../../../types/types.ts";
import { useEffect, useState } from "react";
import Select from "react-select";
import useCinemas from "../../../hooks/useCinemas.ts";

interface ICreateFormInputs {
    register: UseFormRegister<IShowFormData>;
    cinemas: ICinema[];
    getMovies: (cinemaId: number) => Promise<IMovie[] | undefined>;
    setValue: UseFormSetValue<IShowFormData>;
    getHalls: (cinemaId: number) => Promise<number[] | undefined>;
}
interface ISelectOption {
    value: number;
    label: string;
}
function CreateFormSelects({
    register,
    getMovies,
    cinemas,
    setValue,
    getHalls
}: ICreateFormInputs) {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [halls, setHalls] = useState<number[]>([]);
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
                        setValue("hallNumber", undefined);
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
                                label: movie.name
                            }))}
                            onChange={(movie) => {
                                if (!movie) return;
                                const foundMovie = movies.find(
                                    (m) => m.id === movie.value
                                );
                                if (foundMovie) {
                                    setSelectedMovieOption({
                                        value: foundMovie.id,
                                        label: foundMovie.name
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
                                value: hall,
                                label: `Sal ${hall}`
                            }))}
                            onChange={(hall) => {
                                if (!hall) return;
                                setSelectedHallOption({
                                    value: hall.value,
                                    label: `Sal ${hall.value}`
                                });
                                setValue("hallNumber", hall.value);
                            }}
                        />
                    </label>
                </>
            )}
        </>
    );
}

interface IShowFormProps {
    onSubmit: SubmitHandler<IShowFormData>;
    title: string;
}
function ShowForm({ onSubmit, title }: IShowFormProps) {
    const { cinemas, getHallsByCinema, getMoviesByCinema } = useCinemas();
    const { register, handleSubmit, setValue, reset } =
        useForm<IShowFormData>();

    const submitForm: SubmitHandler<IShowFormData> = async (data) => {
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
                getMovies={getMoviesByCinema}
                getHalls={getHallsByCinema}
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
                    {...register("is3D")}
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

export default ShowForm;
