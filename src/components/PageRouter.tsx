import { BrowserRouter, Route, Routes } from "react-router-dom";
import Screenings from "../containers/admin/Screenings.tsx";
import PageLayout from "./PageLayout.tsx";
import Cinemas from "../containers/Cinemas.tsx";
import Reservations from "../containers/admin/reservations/Reservations.tsx";
import ScreeningReservation from "../containers/screeningReservation/ScreeningReservation.tsx";

function PageRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/*change element to desired landing page*/}
                <Route
                    path="*"
                    element={<PageLayout>Not found</PageLayout>}
                />
                <Route
                    path="/cinemas"
                    element={<Cinemas />}
                />
                {/* <Route path="/*" element={<Cinemas />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reservations" element={<Reservations />} /> */}
                <Route
                    path="/screenings"
                    element={<Screenings />}
                />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/movies/:screeningId/reservation" element={<ScreeningReservation />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter; 
