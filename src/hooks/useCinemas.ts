//import { useEffect, useState } from "react";
import type {
    ICinema,
    IHallShortForm,
    IMovieShortForm
} from "../types/types.ts";
//import toast from "react-hot-toast";

function useCinemas() {
    //const [cinemas, setCinemas] = useState<ICinema[]>([]);
    //TODO: Remember isLoading
    //TODO: Replace with actual API calls when backend is ready

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
            halls: [
                {
                    id: 1,
                    number: 1
                },
                {
                    id: 2,
                    number: 2
                },
                {
                    id: 3,
                    number: 3
                }
            ]
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
            halls: [
                {
                    id: 4,
                    number: 1
                },
                {
                    id: 5,
                    number: 2
                },
                {
                    id: 6,
                    number: 3
                }
            ]
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
            halls: [
                {
                    id: 7,
                    number: 1
                },
                {
                    id: 8,
                    number: 2
                }
            ]
        }
    ];
    //const url = import.meta.env.VITE_API_URL + "/cinemas";

    /*async function getAll() {
        const response = await fetch(url);
        const data = await response.json();
        setCinemas(data);
    }*/

    /*useEffect(() => {
        void getAll();
    }, []);*/

    /*async function getById(id: number): Promise<ICinema | undefined> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            toast.error("Kunne ikke finde biograf");
            return;
        }
        return await response.json();
    }*/

    /*async function getMoviesByCinemaId(
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
    async function getMoviesByCinemaId(
        cinemaId: number
    ): Promise<IMovieShortForm[] | undefined> {
        return cinemas.find((c) => c.id === cinemaId)?.movies;
    }

    function getById(id: number): ICinema | undefined {
        return cinemas.find((c) => c.id === id);
    }

    async function getHallsByCinemaId(
        cinemaId: number
    ): Promise<IHallShortForm[] | undefined> {
        return cinemas.find((c) => c.id === cinemaId)?.halls;
    }

    return { cinemas, getById, getMoviesByCinemaId, getHallsByCinemaId };
}

export default useCinemas;
