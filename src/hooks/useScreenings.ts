import { useEffect, useState } from "react";
import type { IScreening } from "../types/types";
import toast from "react-hot-toast";

function useScreenings() {
    const [screenings, setScreenings] = useState<IScreening[]>([]);
    const url = import.meta.env.VITE_API_URL + "/screenings";

    async function getScreenings() {
        const response = await fetch(url);
        const data = await response.json();
        setScreenings(data);
    }

    useEffect(() => {
        void getScreenings();
    }, []);

    async function getScreening(id: number): Promise<IScreening | undefined> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            toast.error("Kunne ikke finde forestillingen");
            return;
        }
        return await response.json();
    }

    async function addScreening(screening: IScreening) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(screening)
        });
        if (!response.ok) {
            toast.error("Kunne ikke oprette forestillingen");
            return;
        }
        const newScreening = await response.json();
        setScreenings([...screenings, newScreening]);
        toast.success("Forestillingen er oprettet");
    }

    async function deleteScreening(id: number) {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            toast.error("Kunne ikke slette forestillingen");
            return;
        }
        const newScreenings = screenings.filter((s) => s.id !== id);
        setScreenings(newScreenings);
        toast.success("Forestillingen er slettet");
    }

    return { screenings, getScreening, addScreening, deleteScreening };
}

export default useScreenings;
