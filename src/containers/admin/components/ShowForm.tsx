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
}
interface ISelectOption {
    value: number;
    label: string;
}
function CreateFormInputs({
    register,
    getMovies,
    cinemas,
    setValue
}: ICreateFormInputs) {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [selectedCinemaOption, setSelectedCinemaOption] =
        useState<ISelectOption>({ value: -1, label: "Vælg en biograf" });
    const [selectedMovieOption, setSelectedMovieOption] =
        useState<ISelectOption>({ value: -1, label: "Vælg en film" });

    useEffect(() => {
        setSelectedMovieOption({ value: -1, label: "Vælg en film" });
    }, [selectedCinemaOption]);

    return (
        <div>
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
                    setMovies(movies ?? []);
                    setValue(
                        "cinema",
                        cinemas.find((c) => {
                            return c.id === cinema.value;
                        })
                    );
                    setValue("movie", undefined);
                }}
            />
            {movies.length !== 0 && (
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
            )}
        </div>
    );
}

interface IShowFormProps {
    onSubmit: SubmitHandler<IShowFormData>;
    title: string;
}
function ShowForm({ onSubmit, title }: IShowFormProps) {
    const { cinemas, getMoviesByCinema } = useCinemas();
    const { register, handleSubmit, setValue, reset } =
        useForm<IShowFormData>();

    const submitForm: SubmitHandler<IShowFormData> = async (data) => {
        await onSubmit(data);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="text-2xl">{title}</div>
            <CreateFormInputs
                register={register}
                getMovies={getMoviesByCinema}
                cinemas={cinemas}
                setValue={setValue}
            />
        </form>
    );
}

export default ShowForm;
