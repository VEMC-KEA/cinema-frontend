import { useEffect, useState } from "react";
import type { IScreening } from "../types/types";
import toast from "react-hot-toast";
import { handleHttpErrors, makeOptions } from "../utils/fetchUtils.ts";

function useScreenings() {
    const [screenings, setScreenings] = useState<IScreening[]>([]);
    const url = import.meta.env.VITE_API_URL + "/screenings";

    async function getAll() {
        try {
            const response = await fetch(url).then(handleHttpErrors);
            const data = await response.json();
            setScreenings(data);
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    useEffect(() => {
        void getAll();
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

    return { screenings, getById, add, destroy };
}

export default useScreenings;
