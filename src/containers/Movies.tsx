import useMovies from "../hooks/useMovies.ts";
import PageLayout from "../components/PageLayout.tsx";
import { useSearchParams } from "react-router-dom";
import { IMovie, IScreening } from "../types/types.ts";
import useScreenings from "../hooks/useScreenings.ts";
import { formatDate, formatTime } from "../utils/formatUtils.ts";

function Screening({ screening }: { screening: IScreening }) {
    return (
        <div className="bg-green-600 rounded p-3 text-stone-200">
            <p>Sal {screening.hall.number}</p>
            <p className="text-2xl font-bold">{formatTime(screening.time)}</p>
        </div>
    );
}

function ScreeningDayGroup({ screenings }: { screenings: IScreening[] }) {
    screenings.sort((a, b) => a.time.localeCompare(b.time));
    return (
        <div className="flex flex-col gap-2 border-r border-stone-300 p-2 justify-start">
            <h3 className="text-black font-semibold text-lg">
                {formatDate(screenings[0].date)}
            </h3>
            {screenings.map((screening) => (
                <Screening
                    screening={screening}
                    key={screening.id}
                />
            ))}
            {screenings.map((screening) => (
                <Screening
                    screening={screening}
                    key={screening.id}
                />
            ))}
            {screenings.map((screening) => (
                <Screening
                    screening={screening}
                    key={screening.id}
                />
            ))}
            {screenings.map((screening) => (
                <Screening
                    screening={screening}
                    key={screening.id}
                />
            ))}
            {screenings.map((screening) => (
                <Screening
                    screening={screening}
                    key={screening.id}
                />
            ))}
            {screenings.map((screening) => (
                <Screening
                    screening={screening}
                    key={screening.id}
                />
            ))}
            {screenings.map((screening) => (
                <Screening
                    screening={screening}
                    key={screening.id}
                />
            ))}
        </div>
    );
}

function Screenings({ movie }: { movie: IMovie }) {
    const { screenings, isLoading } = useScreenings(movie.id);
    const screeningDaysSet = new Set();
    screenings.forEach((screening) => {
        screeningDaysSet.add(screening.date);
    });
    const screeningDays = Array.from(screeningDaysSet).map((date) =>
        screenings.filter((screening) => screening.date === date)
    );

    return (
        <div className="flex">
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading &&
                screeningDays.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
        </div>
    );
}

function Movie({ movie }: { movie: IMovie }) {
    return (
        <div className="flex p-4 gap-4">
            <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-52 h-80 object-cover rounded"
            />
            <div className="flex flex-col font-semibold text-stone-600 overflow-x-scroll relative">
                <div className="">
                    <h2 className="text-3xl font-bold text-black">
                        {movie.title}
                    </h2>
                    <p className="font-semibold text-stone-600">
                        {movie.pg13 ? "PG 13" : "Alle aldre"} - Spilletid{" "}
                        {movie.runTime} min.
                    </p>
                    <p>{movie.genre}</p>
                    <p>{movie.isClassic ? "Klassiker" : ""}</p>
                </div>
                <Screenings movie={movie} />
            </div>
        </div>
    );
}

function Movies() {
    const [searchParams] = useSearchParams();
    const cinemaId = searchParams.get("cinemaId")
        ? Number(searchParams.get("cinemaId"))
        : undefined;
    const cinemaName = searchParams.get("cinemaName")
        ? searchParams.get("cinemaName")
        : "";
    const { movies, isLoading } = useMovies(cinemaId);

    return (
        <PageLayout>
            <div className="px-80">
                <div className="text-4xl text-center">
                    {cinemaName} Forestillinger
                </div>
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
