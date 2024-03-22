import useAuth from "../../hooks/useAuth.ts";
import { Link } from "react-router-dom";
import { LuLogIn, LuLogOut } from "react-icons/lu";

function AuthStatus() {
    const auth = useAuth();

    if (!auth.isLoggedIn()) {
        return (
            <>
                <Link
                    className="font-semibold text-stone-700 hover:text-stone-400 transition-colors flex gap-2 items-center"
                    to="/login"
                >
                    <div className="text-sm border-l pl-2">Log ind</div>
                    <LuLogIn className="text-3xl" />
                </Link>
            </>
        );
    } else {
        return (
            <>
                <div className="text-sm border-l pl-2">
                    (Logget ind som {auth.username})
                </div>
                <Link
                    className="font-semibold text-stone-700 transition-colors"
                    to="/logout"
                >
                    <LuLogOut className="text-3xl hover:text-stone-400" />
                </Link>
            </>
        );
    }
}

export default AuthStatus;
