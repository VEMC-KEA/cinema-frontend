import { FormEvent, useState } from "react";
import useAuth from "./useAuth.ts";
import type { User } from "../utils/auth.ts";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageLayout from "../components/PageLayout.tsx";

const Login = () => {
    const [user, setUser] = useState({ username: "", password: "" });

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const from = location.state?.from?.pathname || "/";

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const user = Object.fromEntries(formData) as unknown as User;

        auth.signIn(user)
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch((err: unknown) => {
                if (err instanceof Error) toast.error(err.message);
            });
    }

    return (
        <PageLayout>
            <div className="w-full flex justify-center items-center">
                <form
                    className="flex flex-col gap-4 p-8 bg-white rounded-xl mt-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="username"
                            className="w-full"
                        >
                            Brugernavn
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Brugernavn"
                            className="border p-1 rounded outline-0"
                            value={user.username}
                            onChange={(e) =>
                                setUser((prev) => ({
                                    ...prev,
                                    username: e.target.value
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="w-full"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="border p-1 rounded outline-0"
                            value={user.password}
                            onChange={(e) =>
                                setUser((prev) => ({
                                    ...prev,
                                    password: e.target.value
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors w-1/2"
                        >
                            Log ind
                        </button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
};

export default Login;
