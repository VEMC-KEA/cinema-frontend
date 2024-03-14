import PageLayout from "../../components/PageLayout";
import { IScreening, ISeatShortForm } from "../../types/types";
import screeningMockData from "./data/screeningMockData";
// import useScreenings from "../../hooks/useScreenings";
// import { useEffect, useState } from "react";

function formatSeatsByRow(screening: IScreening) {
    const seatsByRow: { [rowName: string]: ISeatShortForm[]; } = {};

    screening.hall.seats.forEach((seat) => {
        if (!seatsByRow[seat.rowName]) {
            seatsByRow[seat.rowName] = [];
        }
        seatsByRow[seat.rowName].push(seat);
    });

    Object.keys(seatsByRow).forEach((rowName) => {
        let row = seatsByRow[rowName];
        let evenSeatNumbers: ISeatShortForm[] = [];
        let unevenSeatNumbers: ISeatShortForm[] = [];
        row.forEach((seat) => {
            if (seat.seatNumber % 2 === 0) {
                evenSeatNumbers.push(seat);
            }
            if (seat.seatNumber % 2 === 1) {
                unevenSeatNumbers.push(seat);
            }
        });
        evenSeatNumbers.sort((a, b) => b.seatNumber - a.seatNumber);
        seatsByRow[rowName] = [...evenSeatNumbers, ...unevenSeatNumbers];
    });
    return seatsByRow;
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

    const screening: IScreening = screeningMockData();

    const seatsByRow: { [rowName: string]: ISeatShortForm[]; } = formatSeatsByRow(screening);

    return (
        <PageLayout>
            <div className="flex bg-zinc-900 text-slate-100">
                <div className="flex flex-col w-[67vw] h-[100vh] gap-5 pt-5 bg-zinc-800  items-center shadow-black shadow-2xl">
                    <div className="flex flex-col text-2xl items-center">
                        <div className="text-4xl">{screening.cinema.name}</div>
                        <div>{screening.movie.name}</div>
                        <div>{screening.date} - {screening.time}</div>
                        <div>Sal {screening.hall.number}</div>
                    </div>
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
                                            <div key={seat.seatNumber + seat.rowName} className="w-10 h-10
                                            bg-zinc-950 text-zinc-950 border-2 rounded-lg border-slate-100
                                            hover:cursor-pointer hover:text-slate-100 flex items-center justify-center">
                                                {seat.seatNumber}
                                            </div>
                                        )
                                    })}
                                    <div className="w-[1vw] font-bold">{rowName}</div>
                                </div>
                            )
                        })}
                        <div className="flex items-center gap-4 pt-20">
                            <div className="w-8 h-8 bg-zinc-950 border-2 rounded-lg border-slate-100">
                            </div>
                            <div>Ledig</div>
                            <div className="w-8 h-8 ml-24 bg-lime-500 border-2 rounded-lg border-slate-100">
                            </div>
                            <div>Valgt</div>
                            <div className="w-8 h-8 ml-24 bg-zinc-500 border-2 rounded-lg border-slate-100">
                            </div>
                            <div>Optaget</div>
                        </div>
                    </div>
                </div>
                <div className="w-[33vw] flex flex-col items-center">
                    <div className="pt-20 pb-8 text-xl font-bold border-b w-[25vw] text-center">Dit køb</div>
                </div>
            </div>
        </PageLayout >
    );
}

export default ScreeningReservation;
