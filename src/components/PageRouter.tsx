import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shows from "../containers/admin/Shows.tsx";
import PageLayout from "./PageLayout.tsx";
import Reservations from "../containers/admin/Reservations.tsx";

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
                    path="/shows"
                    element={<Shows />}
                />
                <Route path="/reservations" element={<Reservations />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;
