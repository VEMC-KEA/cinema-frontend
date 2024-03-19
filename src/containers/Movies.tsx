import useMovies from "../hooks/useMovies.ts";
import PageLayout from "../components/PageLayout.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ICinema, IMovie, IScreening } from "../types/types.ts";
import useScreenings from "../hooks/useScreenings.ts";
import { formatDate, formatTime } from "../utils/formatUtils.ts";
import useCinemas from "../hooks/useCinemas.ts";
import { useEffect, useState } from "react";
import {
    MdOutlineArrowBackIosNew,
    MdOutlineArrowForwardIos
} from "react-icons/md";

function Screening({ screening }: { screening: IScreening }) {
    const navigate = useNavigate();
    return (
        <div
            className="bg-green-600 rounded p-3 text-stone-200 cursor-pointer hover:bg-green-700 transition-colors duration-300"
            onClick={() => navigate("/reservation?screeningId=" + screening.id)}
        >
            <p>
                Sal {screening.hall.number} {screening.is3d ? "- 3D" : ""}
            </p>
            <p className="lg:text-2xl font-bold text-center">
                {formatTime(screening.time)}
            </p>
        </div>
    );
}

function ScreeningDayGroup({ screenings }: { screenings: IScreening[] }) {
    screenings.sort((a, b) => a.time.localeCompare(b.time));
    return (
        <div className="flex flex-col gap-2 border-r border-stone-300 p-2 justify-start w-[12.5%] flex-grow-0 flex-shrink-0">
            <h3 className="text-black font-semibold text-lg">
                {formatDate(screenings[0].date)}
            </h3>
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
    const [searchParams] = useSearchParams();
    const cinemaId = searchParams.get("cinemaId")
        ? Number(searchParams.get("cinemaId"))
        : undefined;
    const { futureScreenings: screenings, isLoading } = useScreenings(
        movie.id,
        cinemaId
    );
    const screeningDaysSet = new Set();
    screenings.forEach((screening) => {
        screeningDaysSet.add(screening.date);
    });
    const screeningDays = Array.from(screeningDaysSet).map((date) =>
        screenings.filter((screening) => screening.date === date)
    );
    screeningDays.sort((a, b) => a[0].date.localeCompare(b[0].date));

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [screeningDaysToDisplay, setScreeningDaysToDisplay] = useState<
        IScreening[][]
    >([]);

    useEffect(() => {
        setScreeningDaysToDisplay(screeningDays.slice(startIndex, endIndex));
    }, [startIndex, endIndex, isLoading]);

    return (
        <div className="flex relative w-full">
            {isLoading && <p>Loading...</p>}
            {!isLoading && startIndex > 0 && (
                <div
                    className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-stone-100 to-transparent flex items-center cursor-pointer"
                    onClick={() => {
                        setStartIndex((prev) => prev - 1);
                        setEndIndex((prev) => prev - 1);
                    }}
                >
                    <div className="w-full h-full hover:scale-110 flex justify-center items-center">
                        <MdOutlineArrowBackIosNew className="text-2xl" />
                    </div>
                </div>
            )}
            {!isLoading &&
                !!screenings.length &&
                screeningDaysToDisplay.map((screeningsByDay, index) => (
                    <ScreeningDayGroup
                        screenings={screeningsByDay}
                        key={index}
                    />
                ))}
            {!isLoading && !screenings.length && (
                <div className="text-stone-600 p-4">
                    Ingen forestillinger for denne film endnu
                </div>
            )}
            {!isLoading && endIndex < screeningDays.length && (
                <div
                    className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-stone-100 to-transparent flex justify-center items-center cursor-pointer"
                    onClick={() => {
                        setStartIndex((prev) => prev + 1);
                        setEndIndex((prev) => prev + 1);
                    }}
                >
                    <div className="w-full h-full hover:scale-110 flex justify-center items-center">
                        <MdOutlineArrowForwardIos className="text-2xl" />
                    </div>
                </div>
            )}
        </div>
    );
}

function Movie({ movie }: { movie: IMovie }) {
    return (
        <div className="grid grid-cols-5 p-6 gap-2">
            <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-52 h-80 object-cover rounded"
            />
            <div className="col-span-4">
                <div className="flex flex-col font-semibold text-stone-600">
                    <h2 className="text-3xl font-bold text-black">
                        {movie.title}
                    </h2>
                    <p className="font-semibold text-stone-600">
                        {movie.pg13 ? "PG 13" : "Alle aldre"} - Varighed{" "}
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

function CinemaDetails({ cinema }: { cinema: ICinema | undefined }) {
    if (!cinema) return null;
    return (
        <div className="flex flex-col items-center p-4 gap-2">
            <h1 className="text-5xl font-bold text-stone-800 p-4">
                {cinema.name}
            </h1>
            <img
                src={cinema.imageUrl}
                alt={cinema.name}
                className="rounded"
            />
        </div>
    );
}

function Movies() {
    const [searchParams] = useSearchParams();
    const cinemaId = searchParams.get("cinemaId")
        ? Number(searchParams.get("cinemaId"))
        : undefined;
    const [cinema, setCinema] = useState<ICinema | undefined>(undefined);
    const { getById } = useCinemas();
    const { movies, isLoading } = useMovies(cinemaId);

    useEffect(() => {
        if (cinemaId) {
            getById(cinemaId).then((data) => setCinema(data));
        }
    }, [cinemaId]);

    return (
        <PageLayout>
            <div className="2xl:px-72">
                {!!cinema && <CinemaDetails cinema={cinema} />}
                <div className="py-8 border-y border-stone-300 my-10">
                    <div className="text-4xl font-bold py-2">Program</div>
                    <div className="text-sm font-thin">
                        OBS: Mangler tidspunktet for forestillingen du søger?
                        Kig forbi senere da nye forestillinger planlægges ca. en
                        uge frem ad gangen
                    </div>
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
