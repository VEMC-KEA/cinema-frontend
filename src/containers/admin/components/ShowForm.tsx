import {
    SubmitHandler,
    useForm,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import type {
    ICinema,
    IMovie,
    IShow,
    IShowFormData
} from "../../../types/types.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from "react-select";
import useCinemas from "../../../hooks/useCinemas.ts";

interface IEditFormInputs {
    register: UseFormRegister<IShowFormData>;
    cinemas: ICinema[];
    getMovies: (cinemaId: number) => Promise<IMovie[] | undefined>;
    selectedCinema: ICinema | undefined;
    setValue: UseFormSetValue<IShowFormData>;
    setSelectedCinema: Dispatch<SetStateAction<ICinema | undefined>>;
}
function EditFormInputs({
    register,
    getMovies,
    cinemas,
    selectedCinema,
    setValue,
    setSelectedCinema
}: IEditFormInputs) {
    const [movies, setMovies] = useState<IMovie[] | undefined>([]);
    return (
        <div>
            <Select
                options={cinemas.map((cinema) => ({
                    value: cinema.id,
                    label: cinema.name
                }))}
                value={
                    selectedCinema
                        ? {
                              value: selectedCinema.id,
                              label: selectedCinema.name
                          }
                        : {
                              value: cinemas[0].id,
                              label: cinemas[0].name
                          }
                }
                onChange={async (cinema) => {
                    if (!cinema) return;
                    setMovies(await getMovies(cinema.value));
                    setSelectedCinema(
                        cinemas.find((c) => c.id === cinema.value)
                    );
                    setValue(
                        "cinema",
                        cinemas.find((c) => {
                            console.log(c.id, cinema.value);
                            return c.id === cinema.value;
                        }) || cinemas[0]
                    );
                }}
            />
        </div>
    );
}

interface IShowFormProps {
    selectedShow: IShow | null;
    onSubmit: SubmitHandler<IShowFormData>;
    title: string;
}
function ShowForm({ selectedShow, onSubmit, title }: IShowFormProps) {
    const { cinemas, getMoviesByCinema } = useCinemas();
    const [selectedCinema, setSelectedCinema] = useState<ICinema | undefined>();
    const { register, handleSubmit, setValue, reset } =
        useForm<IShowFormData>();

    useEffect(() => {
        if (selectedShow) {
            setSelectedCinema(selectedShow.cinema);
            setValue("movie", selectedShow.movie);
            setValue("hallNumber", selectedShow.hallNumber);
            setValue("date", selectedShow.date);
            setValue("time", selectedShow.time);
            setValue("is3D", selectedShow.is3D);
        }
    }, [selectedShow]);

    const submitForm: SubmitHandler<IShowFormData> = async (data) => {
        await onSubmit(data);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="text-2xl">{title}</div>
            <EditFormInputs
                register={register}
                getMovies={getMoviesByCinema}
                cinemas={cinemas}
                selectedCinema={selectedCinema}
                setValue={setValue}
                setSelectedCinema={setSelectedCinema}
            />
        </form>
    );
}

export default ShowForm;
