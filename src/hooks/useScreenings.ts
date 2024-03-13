import { useEffect, useState } from "react";
import type { IScreening } from "../types/types";
import toast from "react-hot-toast";

function useScreenings() {
    const [screenings, setScreenings] = useState<IScreening[]>([]);
    const url = import.meta.env.VITE_API_URL + "/screenings";

    async function getAll() {
        const response = await fetch(url);
        const data = await response.json();
        setScreenings(data);
    }

    useEffect(() => {
        void getAll();
    }, []);

    async function getById(id: number): Promise<IScreening | undefined> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            toast.error("Kunne ikke finde forestillingen");
            return;
        }
        return await response.json();
    }

    async function add(screening: IScreening) {
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

    async function destroy(id: number) {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            toast.error("Kunne ikke slette forestillingen");
            return;
        }
        const updatedScreenings = screenings.filter((s) => s.id !== id);
        setScreenings(updatedScreenings);
        toast.success("Forestillingen er slettet");
    }

    return { screenings, getById, add, destroy };
}

export default useScreenings;
