import { useEffect, useState } from "react";
import { IReservation } from "../types/types";
import toast from "react-hot-toast";
import { handleHttpErrors, makeOptions } from "../utils/fetchUtils.ts";

function useReservations() {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const url = import.meta.env.VITE_API_URL + "/reservations";

    async function getAll() {
        try {
            const response = await fetch(url).then(handleHttpErrors);
            const data = await response.json();
            setReservations(data);
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    useEffect(() => {
        void getAll();
    }, []);

    async function getById(id: number): Promise<IReservation | undefined> {
        try {
            const response = await fetch(`${url}/${id}`).then(handleHttpErrors);
            return await response.json();
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
            const newReservations = reservations.filter((r) => r.id !== id);
            setReservations(newReservations);
            toast.success("Reservationen er slettet");
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    return { reservations, getById, destroy };
}

export default useReservations;
