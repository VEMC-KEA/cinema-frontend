import { useContext, useEffect } from "react";
import { Context } from "../../Context";
import PageLayout from "../../components/PageLayout";
import { ISeatShortForm } from "../../types/types";
import formatSeatsByRow from "./helpers/formatSeatsByRow";
import useScreenings from "../../hooks/useScreenings";
import useCinemas from "../../hooks/useCinemas";
import toast from "react-hot-toast";

function calcTotal(selectedSeats: ISeatShortForm[], groupDiscount: number, reservationFee: number, movieBasePrice: number) {
    let total = selectedSeats.reduce((acc) => acc + movieBasePrice, 0);
    if (selectedSeats.length >= 10) total = Math.floor(total - total * groupDiscount);
    if (selectedSeats.length <= 5) total = total + reservationFee;
    return total;
}

function SideBar() {
    const { selectedSeats, cinema, screening } = useContext(Context);
    return (
        <>
            {cinema && screening && (
                <>
                    <div className="pt-20 pb-8 text-xl font-bold border-b w-[20vw] text-center">Dit køb</div>
                    {
                        selectedSeats.length > 0 && (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="px-16 py-2">Sæde</th>
                                            <th className="px-16 py-2">Pris</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedSeats.map((seat) => {
                                            return (
                                                <tr key={seat.id}>
                                                    <td className="px-16 text-left">{seat.number + seat.rowLetter}</td>
                                                    <td className="px-16 text-right">{cinema.movieBasePrice},-</td>
                                                </tr>
                                            )
                                        })}
                                        {selectedSeats.length >= 10 && (
                                            <tr>
                                                <td className="px-16 text-left">Gruppe rabat</td>
                                                <td className="px-16 text-right">-{Math.ceil(selectedSeats.reduce((acc) => acc + cinema.movieBasePrice, 0) * screening.cinema.groupDiscount)},-</td>
                                            </tr>
                                        )}
                                        {
                                            selectedSeats.length <= 5 && (
                                                <tr>
                                                    <td className="px-16 text-left">Reservation gebyr</td>
                                                    <td className="px-16 text-right">{cinema.reservationFee},-</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                <div className="pt-8 pb-8 text-xl font-bold w-[25vw] text-center">Total: {calcTotal(selectedSeats, cinema.groupDiscount, cinema.reservationFee, cinema.movieBasePrice)},- DKK</div>
                                <div className="w-[13vw] text-center bg-zinc-200 rounded-lg p-4 text-lg text-black hover:cursor-pointer hover:bg-zinc-300">Reservér Billetter</div>
                            </>
                        )
                    }
                </>
            )}
        </>
    )
}

function SeatsHeader() {
    const { screening } = useContext(Context);
    return (
        <>
            {screening && (
                <div className="flex flex-col text-2xl items-center">
                    <div className="text-4xl">{screening.cinema.name}</div>
                    <div>{screening.movie.title}</div>
                    <div>{screening.date} {screening.time}</div>
                    <div>Sal {screening.hall.number}</div>
                </div>
            )}
        </>
    );
}

function ShowSeat({ seat }: { seat: ISeatShortForm }) {
    const { selectedSeats, setSelectedSeats, screening } = useContext(Context);
    const handleClick = () => {
        if (selectedSeats.find(selectedSeat => selectedSeat.id === seat.id)) {
            setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat.id !== seat.id));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    }

    return (
        <>
            {screening?.tickets?.some((ticket) => ticket.id === seat.id) ? (
                <div className={`w-10 h-10 border-2 rounded-lg border-slate-100 bg-rose-950 text-rose-950 flex items-center justify-center`}>
                    {seat.number}
                </div>
            ) : (
                <div onClick={handleClick} className={`w-10 h-10
                    border-2 rounded-lg border-slate-100
                    hover:cursor-pointer hover:text-slate-100 flex items-center justify-center
                    ${selectedSeats.find(selectedSeat => selectedSeat.id === seat.id) ? 'bg-sky-950 text-slate-100' : 'bg-lime-700 text-lime-700'}`}>
                    {seat.number}
                </div>
            )}

        </>

    );
}

function ShowSeats() {
    const { seatsByRow } = useContext(Context);
    return (
        <>
            {seatsByRow && (
                <div>
                    <div className="text-center text-4xl mb-5">Vælg Sæder:</div>
                    <div className="border-[2vh] border-zinc-200 bg-zinc-200 
                    rounded-t-full
                    text-center text-zinc-900 text-xl font-semibold">
                        Lærred
                    </div>
                    {Object.keys(seatsByRow).map((rowName) => {
                        const row = seatsByRow[rowName];
                        return (
                            <div key={rowName} className="flex gap-4 p-4 text-center items-center justify-center">
                                <div className="w-[1vw] font-bold">{rowName}</div>
                                {row.map((seat) => {
                                    return (
                                        <div key={seat.number + seat.rowLetter}>
                                            <ShowSeat seat={seat} />
                                        </div>
                                    )
                                })}
                                <div className="w-[1vw] font-bold">{rowName}</div>
                            </div>
                        )
                    })}
                    <div className="flex items-center gap-4 pt-20">
                        <div className="w-8 h-8 bg-lime-700 border-2 rounded-lg border-slate-100">
                        </div>
                        <div>Ledig</div>
                        <div className="w-8 h-8 ml-24 bg-sky-950  border-2 rounded-lg border-slate-100">
                        </div>
                        <div>Valgt</div>
                        <div className="w-8 h-8 ml-24 bg-rose-950 border-2 rounded-lg border-slate-100">
                        </div>
                        <div>Optaget</div>
                    </div>
                </div>
            )}
        </>
    )
}

function ScreeningReservation() {
    const { screening, setScreening, cinema, setCinema, setSeatsByRow } = useContext(Context);
    const { getById: getScreeningById } = useScreenings();
    const { getById: getCinemaById } = useCinemas();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getScreeningById(1);
                if (!data) return;
                setScreening(data);
                setSeatsByRow(formatSeatsByRow(data));
                console.log(data);

                const cinemaData = await getCinemaById(data.cinema.id);
                if (!cinemaData) return;
                setCinema(cinemaData);
                console.log(cinemaData);
            } catch (error) {
                toast.error("Kunne ikke finde forestilling");
            }
        };

        fetchData();
    }, []);

    return (
        <PageLayout>
            {screening && cinema && (
                <div className="flex bg-zinc-900 text-slate-100">
                    <div className="flex flex-col w-[67vw] h-[100vh] gap-5 pt-5 bg-zinc-800  items-center shadow-black shadow-2xl">
                        <SeatsHeader />
                        <ShowSeats />
                    </div>
                    <div className="w-[33vw] flex flex-col items-center">
                        <SideBar />
                    </div>
                </div>)
            }
            {
                (!screening || !cinema) && (
                    <div>Loading...</div>
                )
            }

        </PageLayout >
    );
}

export default ScreeningReservation;


