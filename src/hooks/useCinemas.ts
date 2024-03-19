import { useEffect, useState } from "react";
import type {
    ICinema,
    IHallShortForm,
    IMovieShortForm
} from "../types/types.ts";
import toast from "react-hot-toast";

function useCinemas() {
    const [cinemas, setCinemas] = useState<ICinema[]>([]);

    const url = import.meta.env.VITE_API_URL + "/cinemas";

    async function getAll() {
        const response = await fetch(url);
        const data = await response.json();
        setCinemas(data);
    }

    useEffect(() => {
        void getAll();
    }, []);

    async function getById(id: number): Promise<ICinema | undefined> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            toast.error("Kunne ikke finde biograf");
            return;
        }
        return await response.json();
    }

    async function getMoviesByCinemaId(
        cinemaId: number
    ): Promise<IMovieShortForm[] | undefined> {
        const response = await fetch(`${url}/${cinemaId}/movies`);
        if (!response.ok) {
            toast.error("Kunne ikke finde film");
            return;
        }
        return await response.json();
    }


    return { cinemas, getById, getMoviesByCinemaId };
}

export default useCinemas;
