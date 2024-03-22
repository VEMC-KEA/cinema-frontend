import { useEffect, useState } from "react";
import type { IScreening, IScreeningFormData } from "../types/types";
import toast from "react-hot-toast";
import { handleHttpErrors, makeOptions } from "../utils/fetch.ts";
import HttpException from "../components/errors/HttpException.ts";

function useScreenings(movieId?: number, cinemaId?: number) {
    const [screenings, setScreenings] = useState<IScreening[]>([]);
    const [futureScreenings, setFutureScreenings] = useState<IScreening[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    let url = !!movieId
        ? import.meta.env.VITE_API_URL + "/screenings?movieId=" + movieId
        : import.meta.env.VITE_API_URL + "/screenings";
    url += !!cinemaId ? "&cinemaId=" + cinemaId : "";

    async function getAll() {
        try {
            const response = await fetch(url).then(handleHttpErrors);
            if (response.status === 204) {
                return;
            }
            setScreenings(response);
            const futureScreeningsByDate = response.filter(
                (s: IScreening) => new Date(s.date + " " + s.time) >= new Date()
            );
            setFutureScreenings(futureScreeningsByDate);
        } catch (e: unknown) {
            if (e instanceof HttpException) {
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
            return await fetch(`${url}/${id}`).then(handleHttpErrors);
        } catch (e: unknown) {
            if (e instanceof HttpException) {
                toast.error(e.message);
            }
        }
    }

    async function add(screening: IScreeningFormData) {
        const options = makeOptions("POST", screening, true);
        try {
            const newScreening = await fetch(url, options).then(
                handleHttpErrors
            );
            setScreenings([...screenings, newScreening]);
            toast.success("Forestillingen er oprettet");
        } catch (e: unknown) {
            if (e instanceof HttpException) {
                toast.error(e.message);
            }
        }
    }

    async function destroy(id: number | undefined) {
        if (!id) return;
        const options = makeOptions("DELETE", null, true);
        try {
            await fetch(`${url}/${id}`, options).then(handleHttpErrors);
            const updatedScreenings = screenings.filter((s) => s.id !== id);
            setScreenings(updatedScreenings);
            toast.success("Forestillingen er slettet");
        } catch (e: unknown) {
            if (e instanceof HttpException) {
                toast.error(e.message);
            }
        }
    }

    return { screenings, futureScreenings, isLoading, getById, add, destroy };
}

export default useScreenings;
