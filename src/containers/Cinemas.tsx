import PageLayout from "../components/PageLayout.tsx";
import useCinemas from "../hooks/useCinemas.ts";
import type { ICinema } from "../types/types.ts";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.tsx";

function Cinema({ cinema }: { cinema: ICinema }) {
    const navigate = useNavigate();
    return (
        <div
            className="cursor-pointer relative flex flex-col bg-white rounded min-h-80 h-[60vh] lg:w-1/4 justify-center w-full overflow-hidden"
            onClick={() => navigate(`/movies?cinemaId=${cinema.id}`)}
        >
            <div className="z-10 text-stone-800 text-5xl font-bold bg-white bg-opacity-50 backdrop-blur-sm w-full py-32 text-center pointer-events-none">
                {cinema.name}
            </div>
            <img
                className="hover:scale-110 duration-1000 transition-transform absolute bottom-0 left-0 w-full h-full object-cover rounded"
                alt={cinema.name}
                src={cinema.imageUrl}
            />
        </div>
    );
}

function Cinemas() {
    const { cinemas, isLoading } = useCinemas();

    return (
        <PageLayout>
            {isLoading && (
                <div className="w-full h-screen flex justify-center items-center">
                    <LoadingSpinner size={80} />
                </div>
            )}
            {!isLoading && (
                <div className="p-4 flex gap-4 max-lg:flex-col justify-evenly items-center flex-wrap">
                    {cinemas.map((cinema) => (
                        <Cinema
                            key={cinema.id}
                            cinema={cinema}
                        />
                    ))}
                </div>
            )}
        </PageLayout>
    );
}

export default Cinemas;
