import { useEffect, useState } from "react";
import type { ICinema, IHall } from "../types/types.ts";
import { handleHttpErrors } from "../utils/fetchUtils.ts";
import toast from "react-hot-toast";

function useCinemas() {
    const [cinemas, setCinemas] = useState<ICinema[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
        setIsLoading(true);
        getAll().then(() => setIsLoading(false));
    }, []);

    async function getById(id: number): Promise<ICinema | undefined> {
        try {
            return await fetch(`${url}/${id}`).then(handleHttpErrors);
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
            return await fetch(`${url}/${cinemaId}/halls`).then(
                handleHttpErrors
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    return {
        cinemas,
        isLoading,
        getById,
        getHallsByCinemaId
    };
}

export default useCinemas;
