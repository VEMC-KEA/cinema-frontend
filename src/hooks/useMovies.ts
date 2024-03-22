import { IMovie } from "../types/types.ts";
import { useEffect, useState } from "react";
import { handleHttpErrors } from "../utils/fetch.ts";
import HttpException from "../components/errors/HttpException.ts";
import toast from "react-hot-toast";

function useMovies(cinemaId?: number) {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const url = !!cinemaId
        ? import.meta.env.VITE_API_URL + "/cinemas/" + cinemaId + "/movies"
        : import.meta.env.VITE_API_URL + "/movies";

    async function getMovies() {
        try {
            const response = await fetch(url).then(handleHttpErrors);
            if (response.status === 204) {
                return;
            }
            setMovies(response);
        } catch (e: unknown) {
            if (e instanceof HttpException) {
                toast.error(e.message);
            }
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getMovies().then(() => setIsLoading(false));
    }, []);

    async function getById(id: number): Promise<IMovie | undefined> {
        try {
            return await fetch(url + "/" + id).then(handleHttpErrors);
        } catch (e: unknown) {
            if (e instanceof HttpException) {
                toast.error(e.message);
            }
        }
    }

    return { movies, isLoading, getById };
}

export default useMovies;
