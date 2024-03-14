//import { useEffect, useState } from "react";
import type {
    ICinema,
    IHallShortForm,
    IMovieShortForm
} from "../types/types.ts";
//import { handleHttpErrors } from "../utils/fetchUtils.ts";
//import toast from "react-hot-toast";

function useCinemas() {
    //const [cinemas, setCinemas] = useState<ICinema[]>([]);
    //TODO: Remember isLoading
    //TODO: Replace with actual API calls when backend is ready

    // TEMPORARY MOCKS
    const cinemas: ICinema[] = [
        {
            id: 1,
            name: "Palads Teatret",
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/b/bf/K%C3%B8benhavn_-_Nordisk_Film_Biografer_Palads_%2825363585019%29.jpg",
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
            imageUrl:
                "https://migogkbh.dk/wp-content/uploads/2022/06/nfio-1000x600.png",
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
            imageUrl:
                "https://live.staticflickr.com/5461/30688658861_5efbb9bb35_b.jpg",
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
        try{
            const response = await fetch(url).then(handleHttpErrors);
            const data = await response.json();
            setCinemas(data);
         } catch (e: unknown){
            if(e instanceof Error){
                toast.error(e.message);
            }
        }
    }*/

    /*useEffect(() => {
        void getAll();
    }, []);*/

    /*async function getById(id: number): Promise<ICinema | undefined> {
        try{
            const response = await fetch(`${url}/${id}`).then(handleHttpErrors);
            return await response.json();
        } catch (e: unknown){
            if(e instanceof Error){
                toast.error(e.message);
            }
        }
    }*/

    /*async function getMoviesByCinemaId(
        cinemaId: number
    ): Promise<IMovie[] | undefined> {
        try {
            const response = await fetch(`${url}/${cinemaId}/movies`).then(
                handleHttpErrors
            );
            return await response.json();
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
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
