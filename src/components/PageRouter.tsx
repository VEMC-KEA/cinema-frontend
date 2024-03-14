import { BrowserRouter, Route, Routes } from "react-router-dom";
import Screenings from "../containers/admin/Screenings.tsx";
import Cinemas from "../containers/Cinemas.tsx";
import Reservations from "../containers/admin/reservations/Reservations.tsx";
import AuthProvider from "../security/AuthProvider.tsx";
import Login from "../security/Login.tsx";
import LogOut from "../security/LogOut.tsx";
import RequireAuth from "../security/RequireAuth.tsx";

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
                    {/* <Route path="/*" element={<Cinemas />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/reservations" element={<Reservations />} /> */}
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
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default PageRouter;
