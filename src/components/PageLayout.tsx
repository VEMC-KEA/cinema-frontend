import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LuLogIn, LuPopcorn } from "react-icons/lu";

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
    return (
        <nav className="fixed bg-white w-full top-0 h-20 items-center p-4 text-lg flex justify-between">
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
                {/*TODO: Make available only when logged in*/}
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
                {/*TODO: Change to log out when logged in*/}
                <Link
                    className="font-semibold text-stone-700 hover:text-stone-400 transition-colors"
                    to="/login"
                >
                    <LuLogIn className="text-3xl" />
                </Link>
            </div>
        </nav>
    );
}

export default PageLayout;
