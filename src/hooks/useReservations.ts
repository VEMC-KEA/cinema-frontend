import { useEffect, useState } from "react";
import { IReservation } from "../types/types";
import toast from "react-hot-toast";
import { handleHttpErrors, makeOptions } from "../utils/fetchUtils.ts";

function useReservations() {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const url = import.meta.env.VITE_API_URL + "/reservations";

    async function getAll() {
        try {
            const response = await fetch(url).then(handleHttpErrors);
            const data = await response;
            setReservations(data);
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    useEffect(() => {
        setIsLoading(true);
        void getAll().then(() => setIsLoading(false));
    }, []);

    async function add(screeningId: {
        screeningId: number;
    }): Promise<IReservation | undefined> {
        const options = makeOptions("POST", screeningId, false);
        try {
            return await fetch(`${url}`, options).then(handleHttpErrors);
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    async function update(seatIds: number[], reservationId: number) {
        const options = makeOptions("PUT", { seatIds }, false);
        try {
            return await fetch(`${url}/${reservationId}/tickets`, options).then(
                handleHttpErrors
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    }

    async function complete(reservationId: number) {
        const options = makeOptions("PATCH", null, false);
        try {
            return await fetch(
                `${url}/${reservationId}/complete`,
                options
            ).then(handleHttpErrors);
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

    return { reservations, destroy, add, update, complete, isLoading };
}

export default useReservations;
