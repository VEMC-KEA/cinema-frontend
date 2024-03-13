import { BrowserRouter, Route, Routes } from "react-router-dom";
import Screenings from "../containers/admin/Screenings.tsx";
import PageLayout from "./PageLayout.tsx";
import Reservations from "../containers/admin/reservations/Reservations.tsx";

function PageRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/*change element to desired landing page*/}
                <Route
                    path="*"
                    element={<PageLayout>Not found</PageLayout>}
                />
                {/* <Route path="/*" element={<Cinemas />} />
                <Route path="/cinemas" element={<Cinemas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/reservations" element={<Reservations />} /> */}
                <Route
                    path="/screenings"
                    element={<Screenings />}
                />
                <Route path="/reservations" element={<Reservations />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;
