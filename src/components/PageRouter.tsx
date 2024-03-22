import { BrowserRouter, Route, Routes } from "react-router-dom";
import Screenings from "../containers/admin/Screenings.tsx";
import Cinemas from "../containers/Cinemas.tsx";
import Reservations from "../containers/admin/Reservations.tsx";
import ScreeningReservation from "../containers/ScreeningReservation.tsx";
import AuthProvider from "../security/AuthProvider.tsx";
import Login from "../security/Login.tsx";
import LogOut from "../security/LogOut.tsx";
import RequireAuth from "../security/RequireAuth.tsx";
import Movies from "../containers/Movies.tsx";

function PageRouter() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        path="*"
                        element={<Cinemas />}
                    />
                    <Route
                        path="/cinemas"
                        element={<Cinemas />}
                    />
                    <Route
                        path="/movies"
                        element={<Movies />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/logout"
                        element={<LogOut />}
                    />

                    <Route
                        path="/screenings"
                        element={
                            <RequireAuth>
                                <Screenings />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/reservations"
                        element={
                            <RequireAuth>
                                <Reservations />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/reservation"
                        element={<ScreeningReservation />}
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default PageRouter;
