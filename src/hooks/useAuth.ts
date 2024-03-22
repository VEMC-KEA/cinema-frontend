import { useContext } from "react";
import { AuthContext } from "../components/security/AuthProvider.tsx";

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}

export default useAuth;
