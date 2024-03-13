import { useEffect, useState } from "react";
import { IReservation } from "../types/types";
import toast from "react-hot-toast";

function useReservations() {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const url = import.meta.env.VITE_API_URL + "/reservations";

    async function getReservations() {
        const response = await fetch(url);
        const data = await response.json();
        setReservations(data);
    }

    useEffect(() => {
        void getReservations();
    }, []);

    async function getReservation(id: number): Promise<IReservation | undefined> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            toast.error("Kunne ikke finde reservationen");
        }
        return await response.json();
    }

    async function deleteReservation(id: number) {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            toast.error("Kunne ikke slette reservationen");
            return;
        }
        const newReservations = reservations.filter((r) => r.id !== id);
        setReservations(newReservations);
        toast.success("Reservationen er slettet");
    }

    return { reservations, getReservation, deleteReservation };
}

export default useReservations;