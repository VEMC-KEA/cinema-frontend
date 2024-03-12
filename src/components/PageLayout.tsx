import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

function PageLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-stone-100">
            <NavBar />
            <main className="mt-20">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    );
}

function NavBar() {
    return (
        <nav className='fixed bg-white w-full top-0 h-20 items-center p-4 text-lg flex justify-between'>
            <div className="flex gap-3">
                <Link to="/shows">Forestillinger</Link>
                <Link to="/movies">Film</Link>
                <Link to="/cinemas">Biografer</Link>
                <Link to="/reservations">Reservationer</Link>
            </div>
            <Link to="/login">Log ind</Link>
        </nav>
    );
}


export default PageLayout;