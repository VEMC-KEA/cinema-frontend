import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState
} from "react";
import { ICinema, IScreening, ISeatShortForm } from "./types/types.ts";

interface IContext {
    selectedSeats: ISeatShortForm[];
    setSelectedSeats: Dispatch<SetStateAction<ISeatShortForm[]>>;
    screening: IScreening | undefined;
    setScreening: Dispatch<SetStateAction<IScreening | undefined>>;
    cinema: ICinema | undefined;
    setCinema: Dispatch<SetStateAction<ICinema | undefined>>;
    seatsByRow: { [rowLetter: string]: ISeatShortForm[] } | undefined;
    setSeatsByRow: Dispatch<
        SetStateAction<{ [rowLetter: string]: ISeatShortForm[] } | undefined>
    >;
}

const Context = createContext<IContext>({
    selectedSeats: [],
    setSelectedSeats: () => {},
    screening: undefined,
    setScreening: () => {},
    cinema: undefined,
    setCinema: () => {},
    seatsByRow: undefined,
    setSeatsByRow: () => {}
});

function ContextProvider({ children }: { children: ReactNode }) {
    const [selectedSeats, setSelectedSeats] = useState<ISeatShortForm[]>([]);
    const [screening, setScreening] = useState<IScreening>();
    const [cinema, setCinema] = useState<ICinema>();
    const [seatsByRow, setSeatsByRow] = useState<{
        [rowLetter: string]: ISeatShortForm[];
    }>();

    return (
        <Context.Provider
            value={{
                selectedSeats,
                setSelectedSeats,
                screening,
                setScreening,
                cinema,
                setCinema,
                seatsByRow,
                setSeatsByRow
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;

export { Context };
