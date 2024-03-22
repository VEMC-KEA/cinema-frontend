import { IMovie } from "../types/types.ts";
import { useEffect, useState } from "react";
import { handleHttpErrors } from "../utils/fetch.ts";
import HttpException from "../components/errors/HttpException.ts";

function useMovies(cinemaId: number | undefined) {
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
                console.error(e.message);
            }
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getMovies().then(() => setIsLoading(false));
    }, []);

    return { movies, isLoading };
}

export default useMovies;
