import PageLayout from "../components/PageLayout.tsx";
import useCinemas from "../hooks/useCinemas.ts";
import type { ICinema } from "../types/types.ts";

function Cinema({ cinema }: { cinema: ICinema }) {
    return (
        <div className="flex flex-col p-4 bg-white rounded-xl h-80">
            <h2>{cinema.name}</h2>
        </div>
    );
}

function Cinemas() {
    const { cinemas } = useCinemas();
    return (
        <PageLayout>
            <div className="p-4 flex gap-4 justify-center items-center">
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
