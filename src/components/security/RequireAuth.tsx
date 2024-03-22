import useAuth from "../../hooks/useAuth.ts";
import { Navigate, useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    roles?: string[];
}

function RequireAuth({ children, roles }: Props) {
    const auth = useAuth();

    const location = useLocation();
    if (roles) {
        if (!auth.isLoggedInAs(roles)) {
            return (
                <Navigate
                    to="/login"
                    state={{ from: location }}
                    replace
                />
            );
        }
    }
    if (!auth.username) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }
    return children;
}

export default RequireAuth;
