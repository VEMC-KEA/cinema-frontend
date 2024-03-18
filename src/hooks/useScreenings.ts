import { useEffect, useState } from "react";
import type { IScreening } from "../types/types";
import toast from "react-hot-toast";
import { handleHttpErrors, makeOptions } from "../utils/fetchUtils.ts";

function useScreenings(movieId?: number) {
    const [screenings, setScreenings] = useState<IScreening[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const url = !!movieId
        ? import.meta.env.VITE_API_URL + "/screenings?movieId=" + movieId
        : import.meta.env.VITE_API_URL + "/screenings";

    async function getAll() {
        try {
            const response = await fetch(url).then(handleHttpErrors);
            if (response.status === 204) {
                return;
            }
            setScreenings(response);
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

    async function getById(id: number): Promise<IScreening | undefined> {
        try {
            const response = await fetch(`${url}/${id}`).then(handleHttpErrors);
            return await response.json();
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    async function add(screening: IScreening) {
        const options = makeOptions("POST", screening, true);
        try {
            const response = await fetch(url, options).then(handleHttpErrors);
            const newScreening = await response.json();
            setScreenings([...screenings, newScreening]);
            toast.success("Forestillingen er oprettet");
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    async function destroy(id: number) {
        const options = makeOptions("DELETE", null, true);
        try {
            await fetch(`${url}/${id}`, options).then(handleHttpErrors);
            const updatedScreenings = screenings.filter((s) => s.id !== id);
            setScreenings(updatedScreenings);
            toast.success("Forestillingen er slettet");
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    return { screenings, isLoading, getById, add, destroy };
}

export default useScreenings;
