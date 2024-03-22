import { createContext, PropsWithChildren, useState } from "react";
import {
    authProvider,
    LoginRequest,
    LoginResponse,
    User
} from "../utils/auth.ts";

interface IAuthContext {
    username: string | null;
    signIn: (user: User) => Promise<LoginResponse>;
    signOut: () => void;
    isLoggedIn: () => boolean;
    isLoggedInAs: (role: string[]) => boolean;
}

const AuthContext = createContext<IAuthContext>(null!);

function AuthProvider({ children }: PropsWithChildren) {
    //We use this to distinguish between being logged in or not
    const initialUsername = localStorage.getItem("username") || null;
    const [username, setUsername] = useState<string | null>(initialUsername);

    const signIn = async (user_: LoginRequest) => {
        return authProvider.signIn(user_).then((user) => {
            setUsername(user.username);
            localStorage.setItem("username", user.username);
            localStorage.setItem("roles", JSON.stringify(user.roles));
            localStorage.setItem("token", user.token);
            return user;
        });
    };

    const signOut = () => {
        setUsername(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("roles");
    };

    function isLoggedIn() {
        const token = localStorage.getItem("token");
        if (!token) {
            return false;
        }
        const jwtData = JSON.parse(atob(token.split(".")[1]));
        const exp = jwtData.exp;

        if (!exp) {
            return false;
        }

        const expirationDate = new Date(exp * 1000);
        if (expirationDate < new Date()) {
            signOut();
            return false;
        }

        return username !== null;
    }

    function isLoggedInAs(role: string[]) {
        const roles = JSON.parse(localStorage.getItem("roles") || "[]");
        return role.some((r) => roles.includes(r));
    }

    const value = {
        username,
        signIn,
        signOut,
        isLoggedIn,
        isLoggedInAs
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;
export { AuthContext };
