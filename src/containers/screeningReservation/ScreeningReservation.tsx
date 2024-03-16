import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import { IScreening, ISeatShortForm } from "../../types/types";
import screeningMockData from "./data/screeningMockData";
import formatSeatsByRow from "./helpers/formatSeatsByRow";
// import useScreenings from "../../hooks/useScreenings";
// import { useEffect, useState } from "react";

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

interface IShowSeatProps {
    seat: ISeatShortForm;
    seatState: {
        selectedSeats: ISeatShortForm[];
        setSelectedSeats: (seats: ISeatShortForm[]) => void;
    };
}

function ShowSeat({ seat, seatState }: IShowSeatProps) {
    const handleClick = () => {
        if (seatState.selectedSeats.find(selectedSeat => selectedSeat.rowName === seat.rowName && selectedSeat.seatNumber === seat.seatNumber)) {
            seatState.setSelectedSeats(seatState.selectedSeats.filter(selectedSeat => selectedSeat.rowName !== seat.rowName && selectedSeat.seatNumber !== seat.seatNumber));
        } else {
            seatState.setSelectedSeats([...seatState.selectedSeats, seat]);
        }
    }

    return (
        <div onClick={handleClick} className="w-10 h-10
        bg-zinc-950 text-zinc-950 border-2 rounded-lg border-slate-100
        hover:cursor-pointer hover:text-slate-100 flex items-center justify-center">
            {seat.seatNumber}
        </div>
    );
}

interface IShowSeatsProps {
    seatsByRow: { [rowName: string]: ISeatShortForm[]; };
    seatState: {
        selectedSeats: ISeatShortForm[];
        setSelectedSeats: (seats: ISeatShortForm[]) => void;
    };
}

function ShowSeats({ seatsByRow, seatState }: IShowSeatsProps) {
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
                                    <ShowSeat seat={seat} seatState={seatState} />
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

    const screening: IScreening = screeningMockData();
    const seatsByRow: { [rowName: string]: ISeatShortForm[] } = formatSeatsByRow(screening);
    const [selectedSeats, setSelectedSeats] = useState<ISeatShortForm[]>([]);

    const seatState = {
        selectedSeats: selectedSeats,
        setSelectedSeats: setSelectedSeats
    }

    useEffect(() => {
        console.log(selectedSeats);
    }, [selectedSeats]);

    return (
        <PageLayout>
            <div className="flex bg-zinc-900 text-slate-100">
                <div className="flex flex-col w-[67vw] h-[100vh] gap-5 pt-5 bg-zinc-800  items-center shadow-black shadow-2xl">
                    <SeatsHeader screening={screening} />
                    <ShowSeats seatsByRow={seatsByRow} seatState={seatState} />
                </div>
                <div className="w-[33vw] flex flex-col items-center">
                    <div className="pt-20 pb-8 text-xl font-bold border-b w-[25vw] text-center">Dit køb</div>
                </div>
            </div>
        </PageLayout >
    );
}

export default ScreeningReservation;
