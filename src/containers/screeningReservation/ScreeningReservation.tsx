import { useEffect, useContext } from "react";
import { Context } from "../../Context";
import PageLayout from "../../components/PageLayout";
import { IScreening, ISeatShortForm } from "../../types/types";
import screeningMockData from "./data/screeningMockData";
import formatSeatsByRow from "./helpers/formatSeatsByRow";
// import useScreenings from "../../hooks/useScreenings";
// import { useEffect, useState } from "react";

function calcTotal(selectedSeats: ISeatShortForm[]) {
    return selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
}

function SeatsHeader({ screening }: { screening: IScreening }) {
    return (
        <div className="flex flex-col text-2xl items-center">
            <div className="text-4xl">{screening.cinema.name}</div>
            <div>{screening.movie.name}</div>
            <div>{screening.date} - {screening.time}</div>
            <div>Sal {screening.hall.number}</div>
        </div>
    );
}

function ShowSeat({ seat }: { seat: ISeatShortForm }) {
    const { selectedSeats, setSelectedSeats } = useContext(Context);
    const handleClick = () => {
        if (selectedSeats.find(selectedSeat => selectedSeat.id === seat.id)) {
            setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat.id !== seat.id));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    }

    return (
        <>
            {seat.reserved && (
                <div className={`w-10 h-10 border-2 rounded-lg border-slate-100 bg-rose-950 text-rose-950 flex items-center justify-center`}>
                    {seat.seatNumber}
                </div>
            )}
            {!seat.reserved && (
                <div onClick={handleClick} className={`w-10 h-10
                    border-2 rounded-lg border-slate-100
                    hover:cursor-pointer hover:text-slate-100 flex items-center justify-center
                    ${selectedSeats.find(selectedSeat => selectedSeat.id === seat.id) ? 'bg-sky-950 text-slate-100' : 'bg-lime-700 text-lime-700'}`}>
                    {seat.seatNumber}
                </div>
            )}
        </>

    );
}

function ShowSeats({ seatsByRow }: { seatsByRow: { [rowName: string]: ISeatShortForm[]; } }) {
    return (
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
                                <div key={seat.seatNumber + seat.rowName}>
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
    )
}

function ScreeningReservation() {
    // const { screenings, getById } = useScreenings();
    // const [screening, setScreening] = useState<IScreening>();
    // useEffect(() => {
    //     void getById(1).then((data) => {
    //         if (!data) return;
    //         setScreening(data);
    //     });
    // }, []);

    const { selectedSeats } = useContext(Context);
    const screening: IScreening = screeningMockData();
    const seatsByRow: { [rowName: string]: ISeatShortForm[] } = formatSeatsByRow(screening);

    // useEffect(() => {
    //     console.log(selectedSeats);
    //     Tilret
    // }, [selectedSeats]);

    return (
        <PageLayout>
            <div className="flex bg-zinc-900 text-slate-100">
                <div className="flex flex-col w-[67vw] h-[100vh] gap-5 pt-5 bg-zinc-800  items-center shadow-black shadow-2xl">
                    <SeatsHeader screening={screening} />
                    <ShowSeats seatsByRow={seatsByRow} />
                </div>
                <div className="w-[33vw] flex flex-col items-center">
                    <div className="pt-20 pb-8 text-xl font-bold border-b w-[20vw] text-center">Dit køb</div>
                    {
                        selectedSeats.length > 0 && (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Sæde</th>
                                            <th className="px-4 py-2">Pris</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedSeats.map((seat) => {
                                            return (
                                                <tr key={seat.id}>
                                                    <td className="px-4">{seat.seatNumber + seat.rowName}</td>
                                                    <td className="px-4">{seat.price},-</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className="pt-8 pb-8 text-xl font-bold w-[25vw] text-center">Total: {calcTotal(selectedSeats)},- DKK</div>
                                <div className="w-[13vw] text-center bg-zinc-200 rounded-lg p-4 text-lg text-black hover:cursor-pointer hover:bg-zinc-300">Reservér Billetter</div>
                            </>
                        )
                    }
                </div>
            </div>
        </PageLayout >
    );
}

export default ScreeningReservation;


