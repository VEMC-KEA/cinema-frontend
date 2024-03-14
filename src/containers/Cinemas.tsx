import PageLayout from "../components/PageLayout.tsx";
import useCinemas from "../hooks/useCinemas.ts";
import type { ICinema } from "../types/types.ts";
import { useNavigate } from "react-router-dom";

function Cinema({ cinema }: { cinema: ICinema }) {
    const navigate = useNavigate();
    return (
        <div
            className="cursor-pointer relative flex flex-col bg-white rounded-xl min-h-80 h-[60vh] w-80 justify-end overflow-hidden"
            onClick={() => navigate(`/movies?cinemaId=${cinema.id}`)}
        >
            <div className="z-10 text-stone-800 text-2xl bg-white w-full p-2 text-center">
                {cinema.name}
            </div>
            <img
                className="hover:scale-110 duration-1000 transition-transform absolute bottom-0 left-0 w-full h-full object-cover rounded-xl"
                alt={cinema.name}
                src={cinema.imageUrl}
            />
        </div>
    );
}

function Cinemas() {
    const { cinemas } = useCinemas();
    return (
        <PageLayout>
            <div className="p-4 flex gap-4 justify-center items-center flex-wrap">
                {cinemas.map((cinema) => (
                    <Cinema
                        key={cinema.id}
                        cinema={cinema}
                    />
                ))}
            </div>
        </PageLayout>
    );
}
export default Cinemas;
