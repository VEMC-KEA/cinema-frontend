import useMovies from "../hooks/useMovies.ts";
import PageLayout from "../components/PageLayout.tsx";
import { useSearchParams } from "react-router-dom";
import { IMovie } from "../types/types.ts";

function Movie({ movie }: { movie: IMovie }) {
    return (
        <div className="flex p-4 gap-4">
            <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-20"
            />
            <div>
                <h2 className="text-2xl">{movie.title}</h2>
                <p className="font-bold">
                    {movie.pg13 ? "PG 13" : "Alle aldre"}
                </p>
                <p>Genre: {movie.genre}</p>
                <p>Spilletid: {movie.runTime} min.</p>
                <p>{movie.isClassic ? "Klassiker" : ""}</p>
            </div>
        </div>
    );
}

function Movies() {
    const [searchParams] = useSearchParams();
    const cinemaId = searchParams.get("cinemaId")
        ? Number(searchParams.get("cinemaId"))
        : undefined;
    const { movies, isLoading } = useMovies(cinemaId);

    return (
        <PageLayout>
            <div className="flex flex-col gap-2">
                {isLoading && <p>Loading...</p>}
                {!isLoading &&
                    movies.map((movie) => (
                        <Movie
                            movie={movie}
                            key={movie.id}
                        />
                    ))}
            </div>
        </PageLayout>
    );
}

export default Movies;
