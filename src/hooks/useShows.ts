import { useEffect, useState } from "react";
import type { IShow } from "../types/types";
import toast from "react-hot-toast";

function useShows() {
    const [shows, setShows] = useState<IShow[]>([]);
    const url = import.meta.env.VITE_API_URL + "/shows";

    async function getShows() {
        const response = await fetch(url);
        const data = await response.json();
        setShows(data);
    }

    useEffect(() => {
        void getShows();
    }, []);

    async function getShow(id: number): Promise<IShow | undefined> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            toast.error("Kunne ikke finde forestillingen");
            return;
        }
        return await response.json();
    }

    async function addShow(show: IShow) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(show)
        });
        if (!response.ok) {
            toast.error("Kunne ikke oprette forestillingen");
            return;
        }
        const newShow = await response.json();
        setShows([...shows, newShow]);
        toast.success("Forestillingen er oprettet");
    }

    async function deleteShow(id: number) {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            toast.error("Kunne ikke slette forestillingen");
            return;
        }
        const newShows = shows.filter((s) => s.id !== id);
        setShows(newShows);
        toast.success("Forestillingen er slettet");
    }

    return { shows, getShow, addShow, deleteShow };
}

export default useShows;
