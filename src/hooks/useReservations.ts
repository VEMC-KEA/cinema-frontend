import { useEffect, useState } from "react";
import { IReservation } from "../types/types";
import { makeOptions } from "../utils/fetchUtils";
import toast from "react-hot-toast";

function useReservations() {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const url = import.meta.env.VITE_API_URL + "/reservations";

    async function getAll() {
        const response = await fetch(url);
        const data = await response.json();
        setReservations(data);
    }

    useEffect(() => {
        void getAll();
    }, []);

    async function add(screeningId: { screeningId: number }): Promise<IReservation | undefined> {
        const response = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(screeningId)
        });
        if (!response.ok) {
            toast.error("Kunne ikke slette reservationen");
            return;
        }
        return await response.json();
    }

    async function update(seatIds: number[], reservationId: number) {
        const response = await fetch(`${url}/${reservationId}/tickets`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ seatIds })
        });
        if (!response.ok) {
            toast.error("Kunne ikke opdatere reservationen");
            return;
        }
    }

    async function complete(reservationId: number) {
        const response = await fetch(`${url}/${reservationId}/complete`, {
            method: "PATCH"
        });
        if (!response.ok) {
            toast.error("Kunne ikke fuldføre reservationen");
            return;
        }
    }

    async function destroy(id: number) {
        const response = await fetch(`${url}/${id}`, makeOptions("DELETE", null, true));
        if (!response.ok) {
            toast.error("Kunne ikke slette reservationen");
            return;
        }
        const newReservations = reservations.filter((r) => r.id !== id);
        setReservations(newReservations);
        toast.success("Reservationen er slettet");
    }

    return { reservations, destroy, add, update, complete };
}

export default useReservations;