import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LuPopcorn } from "react-icons/lu";
import AuthStatus from "../security/AuthStatus.tsx";
import useAuth from "../security/useAuth.ts";

function PageLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-stone-100">
            <NavBar />
            <main className="mt-20">{children}</main>
            <Toaster position={"bottom-center"} />
            {/* <Footer /> */}
        </div>
    );
}

function NavBar() {
    const auth = useAuth();
    return (
        <nav className="fixed z-20 bg-white w-full top-0 h-20 items-center p-4 text-lg flex justify-between">
            <div className="flex gap-3 items-center">
                <LuPopcorn className="text-4xl text-red-600" />
                <Link
                    className="font-semibold text-stone-700 hover:text-stone-400 transition-colors"
                    to="/movies"
                >
                    Film
                </Link>
                <Link
                    className="font-semibold text-stone-700 hover:text-stone-400 transition-colors"
                    to="/cinemas"
                >
                    Biografer
                </Link>
            </div>
            <div className="flex gap-3 items-center">
                {auth.isLoggedIn() && (
                    <>
                        <Link
                            className="font-semibold text-stone-700 hover:text-stone-400 transition-colors"
                            to="/screenings"
                        >
                            Forestillinger
                        </Link>
                        <Link
                            className="font-semibold text-stone-700 hover:text-stone-400 transition-colors"
                            to="/reservations"
                        >
                            Reservationer
                        </Link>
                    </>
                )}
                <AuthStatus />
            </div>
        </nav>
    );
}

export default PageLayout;
