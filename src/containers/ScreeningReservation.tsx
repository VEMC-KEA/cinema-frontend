import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from "react";
import { Context } from "../Context.tsx";
import PageLayout from "../components/PageLayout.tsx";
import { IMovie, ISeatShortForm } from "../types/types.ts";
import useScreenings from "../hooks/useScreenings.ts";
import useCinemas from "../hooks/useCinemas.ts";
import toast from "react-hot-toast";
import useReservations from "../hooks/useReservations.ts";
import { calcTotal } from "../utils/calculations.ts";
import Modal from "../components/Modal.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    formatDate,
    formatTime,
    formatSeatsByRow
} from "../utils/formatting.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import useMovies from "../hooks/useMovies.ts";

function ConfirmModal({
    onSubmit,
    onClose
}: {
    onSubmit: () => void;
    onClose: () => void;
}) {
    return (
        <Modal>
            <h2 className="p-4 text-2xl">Vil du oprette reservationen?</h2>
            <div className="flex gap-4 justify-center items-center mt-5">
                <button
                    className="w-full p-1 bg-lime-700 text-white rounded hover:bg-lime-800"
                    onClick={onSubmit}
                >
                    Opret
                </button>
                <button
                    className="w-full p-1 bg-rose-900 text-white rounded hover:bg-rose-950"
                    onClick={onClose}
                >
                    Annullér
                </button>
            </div>
        </Modal>
    );
}

function CompleteReservationModal({
    onSubmit,
    reservationId
}: {
    onSubmit: () => void;
    reservationId: number | undefined;
}) {
    if (!reservationId) return null;
    return (
        <Modal>
            <div className="flex flex-col text-center pb-10">
                <div className="text-2xl">Reservationen er oprettet!</div>
                <div className="text-2xl">
                    Afhentningskode:{" "}
                    <span className="font-bold text-blue-600">
                        {reservationId}
                    </span>
                </div>
            </div>
            <Header />
            <ShowReservationTable />
            <div className="">
                <button
                    className="w-full p-1 bg-lime-700 text-white rounded hover:bg-lime-800"
                    onClick={onSubmit}
                >
                    Gå tilbage til forsiden
                </button>
            </div>
        </Modal>
    );
}

function ShowReservationTable() {
    const { selectedSeats, cinema, screening } = useContext(Context);

    return (
        <>
            {cinema && screening && selectedSeats.length > 0 && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th className="px-16 py-2 text-left">Sæde</th>
                                <th className="px-16 py-2 text-left">Pris</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSeats.map((seat) => {
                                return (
                                    <tr key={seat.id}>
                                        <td className="px-16 text-left">
                                            {seat.number + seat.rowLetter}
                                        </td>
                                        <td className="px-16 text-right">
                                            {cinema.movieBasePrice},-
                                        </td>
                                    </tr>
                                );
                            })}
                            {selectedSeats.length >= 10 && (
                                <tr>
                                    <td className="px-16 text-left">
                                        Gruppe rabat
                                    </td>
                                    <td className="px-16 text-right">
                                        -
                                        {Math.ceil(
                                            selectedSeats.reduce(
                                                (acc) =>
                                                    acc + cinema.movieBasePrice,
                                                0
                                            ) * cinema.groupDiscount
                                        )}
                                        ,-
                                    </td>
                                </tr>
                            )}
                            {selectedSeats.length <= 5 && (
                                <tr>
                                    <td className="px-16 text-left">
                                        Reservation gebyr
                                    </td>
                                    <td className="px-16 text-right">
                                        {cinema.reservationFee},-
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="pt-8 pb-8 text-xl font-bold w-[25vw] text-center">
                        Total:{" "}
                        {calcTotal(
                            selectedSeats,
                            cinema.groupDiscount,
                            cinema.reservationFee,
                            cinema.movieBasePrice
                        )}
                        ,- DKK
                    </div>
                </>
            )}
        </>
    );
}

function SideBar({
    setShowReservationConfirm,
    disableButton
}: {
    setShowReservationConfirm: Dispatch<SetStateAction<boolean>>;
    disableButton: boolean;
}) {
    const { cinema, screening, selectedSeats } = useContext(Context);

    function handleClick() {
        if (disableButton) return;
        setShowReservationConfirm(true);
    }

    return (
        <div className="w-[33vw] max-lg:w-full flex flex-col items-center">
            {cinema && screening && (
                <>
                    <div className="pt-20 pb-8 text-xl font-bold border-b w-[20vw] max-lg:w-full text-center">
                        Din reservation
                    </div>
                    {cinema && screening && selectedSeats.length > 0 && (
                        <>
                            <ShowReservationTable />
                            {disableButton && <LoadingSpinner size={40} />}
                            {!disableButton && (
                                <div
                                    aria-disabled={disableButton}
                                    onClick={handleClick}
                                    className="font-semibold w-80 text-center bg-zinc-200 rounded-lg p-4 text-lg text-black hover:cursor-pointer hover:bg-zinc-300"
                                >
                                    Reservér Billetter
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

function Header() {
    const { screening } = useContext(Context);
    const { getById } = useMovies();
    const [movie, setMovie] = useState<IMovie | undefined>();

    useEffect(() => {
        if (!screening) return;
        getById(screening.movie.id).then((movie) => setMovie(movie));
    }, [screening]);

    return (
        <>
            {screening && (
                <div className="flex gap-8 w-full px-4">
                    <img
                        src={movie?.imageUrl}
                        alt={screening.movie.title}
                        className="w-20 rounded-md object-cover"
                    />

                    <div className="flex flex-col text-2xl w-full">
                        <div className="text-4xl font-bold text-red-900">
                            {screening.movie.title}
                        </div>
                        <div className="text-3xl font-semibold">
                            {screening.cinema.name} - Sal{" "}
                            {screening.hall.number}
                        </div>
                        <div className="text-3xl">
                            {formatDate(screening.date)} kl.{" "}
                            {formatTime(screening.time)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function ShowSeat({
    seat,
    ticketList
}: {
    seat: ISeatShortForm;
    ticketList: number[];
}) {
    const { selectedSeats, setSelectedSeats } = useContext(Context);

    const handleClick = () => {
        if (selectedSeats.find((selectedSeat) => selectedSeat.id === seat.id)) {
            setSelectedSeats(
                selectedSeats.filter(
                    (selectedSeat) => selectedSeat.id !== seat.id
                )
            );
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    return (
        <>
            {ticketList.some((id) => id === seat.id) ? (
                <div
                    className={`w-10 h-10 border-2 rounded-lg border-slate-100 bg-rose-950 text-rose-950 flex items-center justify-center`}
                >
                    {seat.number}
                </div>
            ) : (
                <div
                    onClick={handleClick}
                    className={`w-10 h-10
                    border-2 rounded-lg border-slate-100
                    hover:cursor-pointer hover:text-slate-100 flex items-center justify-center
                    ${selectedSeats.find((selectedSeat) => selectedSeat.id === seat.id) ? "bg-sky-950 text-slate-100" : "bg-lime-700 text-lime-700"}`}
                >
                    {seat.number}
                </div>
            )}
        </>
    );
}

function ShowSeats() {
    const { seatsByRow, screening } = useContext(Context);
    let ticketList =
        screening?.reservations?.flatMap((reservation) =>
            reservation.tickets.flatMap((ticket) => ticket.seatId)
        ) ?? [];
    return (
        <>
            {seatsByRow && (
                <div className="border p-4 rounded bg-zinc-900">
                    <div className="text-center text-3xl mb-5">Vælg Sæder:</div>
                    <div
                        className="p-2 border-zinc-200 bg-zinc-200
                    rounded-t-xl
                    text-center text-zinc-900 text-xl font-semibold"
                    >
                        Lærred
                    </div>
                    {Object.keys(seatsByRow).map((rowName) => {
                        const row = seatsByRow[rowName];
                        return (
                            <div
                                key={rowName}
                                className="flex gap-4 p-4 text-center items-center justify-center"
                            >
                                <div className="w-[1vw] font-bold">
                                    {rowName}
                                </div>
                                {row.map((seat) => {
                                    return (
                                        <div key={seat.number + seat.rowLetter}>
                                            <ShowSeat
                                                seat={seat}
                                                ticketList={ticketList}
                                            />
                                        </div>
                                    );
                                })}
                                <div className="w-[1vw] font-bold">
                                    {rowName}
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex justify-center items-center gap-4 pt-20">
                        <div className="w-8 h-8 bg-lime-700 border-2 rounded-lg border-slate-100"></div>
                        <div>Ledig</div>
                        <div className="w-8 h-8 ml-24 bg-sky-950  border-2 rounded-lg border-slate-100"></div>
                        <div>Valgt</div>
                        <div className="w-8 h-8 ml-24 bg-rose-950 border-2 rounded-lg border-slate-100"></div>
                        <div>Optaget</div>
                    </div>
                </div>
            )}
        </>
    );
}

function ScreeningReservation() {
    const {
        screening,
        setScreening,
        cinema,
        setCinema,
        setSeatsByRow,
        selectedSeats,
        setSelectedSeats
    } = useContext(Context);
    const navigate = useNavigate();
    const [showReservationConfirm, setShowReservationConfirm] = useState(false);
    const [showReservationComplete, setShowReservationComplete] =
        useState(false);
    const { getById: getScreeningById } = useScreenings();
    const { getById: getCinemaById } = useCinemas();
    const {
        add: addReservation,
        update: updateReservation,
        complete: completeReservation
    } = useReservations();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const screeningId = searchParams.get("screeningId")
        ? Number(searchParams.get("screeningId"))
        : undefined;
    const [reservationId, setReservationId] = useState<number | undefined>();

    useEffect(() => {
        async function fetchData() {
            try {
                if (!screeningId) return;
                const screeningData = await getScreeningById(screeningId);
                if (!screeningData) return;
                setScreening(screeningData);
                setSeatsByRow(formatSeatsByRow(screeningData));

                const cinemaData = await getCinemaById(screeningData.cinema.id);
                if (!cinemaData) return;
                setCinema(cinemaData);
            } catch (error) {
                toast.error("Kunne ikke finde forestilling");
            }
        }

        async function addInitialReservation() {
            if (!screeningId) return;
            const jsonBody = { screeningId: screeningId };
            const reservation = await addReservation(jsonBody);
            if (!reservation) {
                toast.error("Kan ikke kontakte serveren. Prøv igen senere");
                return;
            }
            setReservationId(reservation.id);
        }
        void fetchData();
        void addInitialReservation();
    }, []);

    useEffect(() => {
        setSelectedSeats([]);
    }, [screeningId]);

    useEffect(() => {
        async function updateReservationWithSelectedSeats() {
            if (!reservationId) return;
            const seatIds = selectedSeats.map((seat) => seat.id);
            setIsLoading(true);
            void updateReservation(seatIds, reservationId).then(() =>
                setIsLoading(false)
            );
        }

        void updateReservationWithSelectedSeats();
    }, [selectedSeats]);

    return (
        <PageLayout>
            {screening && cinema && (
                <div className="flex bg-zinc-900 text-slate-100 max-lg:flex-col">
                    <div className="flex flex-col w-[67vw] max-lg:w-full h-[100vh] gap-5 pt-5 bg-zinc-800 items-center shadow-black shadow-2xl">
                        <Header />
                        <ShowSeats />
                    </div>
                    <SideBar
                        setShowReservationConfirm={setShowReservationConfirm}
                        disableButton={isLoading}
                    />
                </div>
            )}
            {(!screening || !cinema) && (
                <div className="h-screen w-full flex justify-center items-center">
                    <LoadingSpinner size={80} />
                </div>
            )}
            {showReservationConfirm && (
                <ConfirmModal
                    onSubmit={() => {
                        if (!reservationId) return;
                        void completeReservation(reservationId);
                        setShowReservationConfirm(false);
                        setShowReservationComplete(true);
                    }}
                    onClose={() => {
                        setShowReservationConfirm(false);
                    }}
                />
            )}
            {showReservationComplete && (
                <CompleteReservationModal
                    onSubmit={() => {
                        setShowReservationConfirm(false);
                        setShowReservationComplete(false);
                        setSelectedSeats([]);
                        navigate("/");
                    }}
                    reservationId={reservationId}
                />
            )}
        </PageLayout>
    );
}

export default ScreeningReservation;
