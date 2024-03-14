import useAuth from "./useAuth.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    useEffect(() => {
        signOut();
    }, [signOut]);
    navigate("/");
    return null;
}

export default LogOut;
