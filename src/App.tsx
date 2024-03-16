import { SetStateAction, createContext } from "react";
import PageRouter from "./components/PageRouter.tsx";
// const [selectedSeats, setSelectedSeats] = useState<ISeatShortForm[]>([]);

// interface ScreeningReservationContextType {
//     selectedSeats: string;
//     setRole: React.Dispatch<SetStateAction<string>>;
// }
  
// const screeningReservationContext = createContext<ScreeningReservationContextType>({ selectedSeats: [], setRole: () => {} });

function App() {
    return <PageRouter />;
}

export default App;
