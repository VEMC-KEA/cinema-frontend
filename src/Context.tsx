import { SetStateAction, createContext, useState } from "react";
import { ISeatShortForm } from "./types/types.ts";

interface IContext {
    selectedSeats: ISeatShortForm[];
    setSelectedSeats: React.Dispatch<SetStateAction<ISeatShortForm[]>>;
}

const Context = createContext<IContext>({ selectedSeats: [], setSelectedSeats: () => { } });

function ContextProvider({ children }: { children: React.ReactNode }) {
    const [selectedSeats, setSelectedSeats] = useState<ISeatShortForm[]>([]);

    return (
        <Context.Provider value={{ selectedSeats, setSelectedSeats: setSelectedSeats }}>
            {children}
        </Context.Provider>
    )
}


export default ContextProvider;

export { Context };