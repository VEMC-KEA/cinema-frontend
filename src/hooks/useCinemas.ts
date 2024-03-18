import { useEffect, useState } from "react";
import type { ICinema, IHall, IMovie } from "../types/types.ts";
import { handleHttpErrors } from "../utils/fetchUtils.ts";
import toast from "react-hot-toast";

function useCinemas() {
    const [cinemas, setCinemas] = useState<ICinema[]>([]);
    //TODO: Remember isLoading

    const url = import.meta.env.VITE_API_URL + "/cinemas";

    async function getAll() {
        try {
            const response = await fetch(url).then(handleHttpErrors);
            const data = await response;
            if (data.statusCode === 204) {
                return;
            }
            setCinemas(data);
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    useEffect(() => {
        void getAll();
    }, []);

    async function getById(id: number): Promise<ICinema | undefined> {
        try {
            const response = await fetch(`${url}/${id}`).then(handleHttpErrors);
            return await response.json();
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    async function getMoviesByCinemaId(
        cinemaId: number
    ): Promise<IMovie[] | undefined> {
        try {
            const response = await fetch(`${url}/${cinemaId}/movies`).then(
                handleHttpErrors
            );
            return await response.json();
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    async function getHallsByCinemaId(
        cinemaId: number
    ): Promise<IHall[] | undefined> {
        try {
            const response = await fetch(`${url}/${cinemaId}/halls`).then(
                handleHttpErrors
            );
            return await response.json();
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    return { cinemas, getById, getMoviesByCinemaId, getHallsByCinemaId };
}

export default useCinemas;
