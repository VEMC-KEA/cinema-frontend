import { SetStateAction, createContext, useState } from "react";
import { ICinema, IScreening, ISeatShortForm } from "./types/types.ts";

interface IContext {
    selectedSeats: ISeatShortForm[];
    setSelectedSeats: React.Dispatch<SetStateAction<ISeatShortForm[]>>;
    screening: IScreening | undefined;
    setScreening: React.Dispatch<SetStateAction<IScreening | undefined>>;
    cinema: ICinema | undefined;
    setCinema: React.Dispatch<SetStateAction<ICinema | undefined>>;
    seatsByRow: { [rowLetter: string]: ISeatShortForm[] } | undefined;
    setSeatsByRow: React.Dispatch<SetStateAction<{ [rowLetter: string]: ISeatShortForm[] } | undefined>>;
}

const Context = createContext<IContext>({
    selectedSeats: [],
    setSelectedSeats: () => { },
    screening: undefined,
    setScreening: () => { },
    cinema: undefined,
    setCinema: () => { },
    seatsByRow: undefined,
    setSeatsByRow: () => { },
});

function ContextProvider({ children }: { children: React.ReactNode }) {
    const [selectedSeats, setSelectedSeats] = useState<ISeatShortForm[]>([]);
    const [screening, setScreening] = useState<IScreening>();
    const [cinema, setCinema] = useState<ICinema>();
    const [seatsByRow, setSeatsByRow] = useState<{ [rowLetter: string]: ISeatShortForm[] }>();

    return (
        <Context.Provider value={{
            selectedSeats, setSelectedSeats,
            screening, setScreening,
            cinema, setCinema,
            seatsByRow, setSeatsByRow
        }}>
            {children}
        </Context.Provider>
    )
}


export default ContextProvider;

export { Context };