//import { useEffect, useState } from "react";
import type { ICinema, IMovie } from "../types/types.ts";
//import toast from "react-hot-toast";

function useCinemas() {
    //const [cinemas, setCinemas] = useState<ICinema[]>([]);
    // TEMPORARY MOCKS
    const cinemas: ICinema[] = [
        {
            id: 1,
            name: "CinemaxX",
            movies: [
                {
                    id: 1,
                    name: "The Matrix"
                },
                {
                    id: 2,
                    name: "The Matrix Reloaded"
                }
            ],
            halls: [1, 2, 3]
        },
        {
            id: 2,
            name: "Nordisk Film Biografer",
            movies: [
                {
                    id: 3,
                    name: "The Matrix Revolutions"
                }
            ],
            halls: [1, 2, 3]
        },
        {
            id: 3,
            name: "Cinema City",
            movies: [
                {
                    id: 4,
                    name: "Die Hard"
                }
            ],
            halls: [1, 2]
        }
    ];
    //const url = import.meta.env.VITE_API_URL + "/cinemas";

    /*async function getCinemas() {
        const response = await fetch(url);
        const data = await response.json();
        setCinemas(data);
    }*/

    /*useEffect(() => {
        void getCinemas();
    }, []);*/

    /*async function getCinema(id: number): Promise<ICinema | undefined> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            toast.error("Kunne ikke finde biograf");
            return;
        }
        return await response.json();
    }*/

    /*async function getMoviesByCinema(
        cinemaId: number
    ): Promise<IMovie[] | undefined> {
        const response = await fetch(`${url}/${cinemaId}/movies`);
        if (!response.ok) {
            toast.error("Kunne ikke finde film");
            return;
        }
        return await response.json();
    }*/

    // TEMPORARY MOCKS
    async function getMoviesByCinema(
        cinemaId: number
    ): Promise<IMovie[] | undefined> {
        return cinemas.find((c) => c.id === cinemaId)?.movies;
    }

    function getCinema(id: number): ICinema | undefined {
        return cinemas.find((c) => c.id === id);
    }

    async function getHallsByCinema(
        cinemaId: number
    ): Promise<number[] | undefined> {
        return cinemas.find((c) => c.id === cinemaId)?.halls;
    }

    return { cinemas, getCinema, getMoviesByCinema, getHallsByCinema };
}

export default useCinemas;
