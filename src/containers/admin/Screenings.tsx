import PageLayout from "../../components/PageLayout.tsx";
import type { IScreening, IScreeningFormData } from "../../types/types.ts";
import Modal from "../../components/Modal.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import ScreeningForm from "./components/ScreeningForm.tsx";
import { SubmitHandler } from "react-hook-form";
//import useScreenings from "../hooks/useScreenings.ts";

interface IScreeningCreateModalProps {
    onSubmit: SubmitHandler<IScreeningFormData>;
    onClose: () => void;
}
function CreateModal({ onSubmit, onClose }: IScreeningCreateModalProps) {
    return (
        <Modal>
            <ScreeningForm
                onSubmit={onSubmit}
                title={"Opret forestilling"}
            />
            <button
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={onClose}
            >
                Luk
            </button>
        </Modal>
    );
}

interface IScreeningDeleteModalProps {
    onSubmit: () => void;
    onClose: () => void;
}
function DeleteModal({ onSubmit, onClose }: IScreeningDeleteModalProps) {
    return (
        <Modal>
            <h2 className="text-2xl p-4">
                Er du sikker på at du vil slette denne forestilling?
            </h2>
            <div className="flex gap-4 justify-center items-center mt-5">
                <button
                    className="w-full p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={onSubmit}
                >
                    Slet
                </button>
                <button
                    className="w-full p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={onClose}
                >
                    Annuller
                </button>
            </div>
        </Modal>
    );
}

interface IScreeningProps {
    screening: IScreening;
    setScreeningCreateModal: Dispatch<SetStateAction<boolean>>;
    setScreeningDeleteModal: Dispatch<SetStateAction<boolean>>;
    setSelectedScreening: Dispatch<SetStateAction<IScreening | null>>;
}
function Screening({ screening, setScreeningDeleteModal, setSelectedScreening }: IScreeningProps) {
    return (
        <tr className="border-b">
            <td className="p-1">{screening.movie.name}</td>
            <td>{screening.cinema.name}</td>
            <td>{screening.hallNumber}</td>
            <td>{screening.date}</td>
            <td>{screening.time}</td>
            <td>{screening.is3D ? "3D" : "2D"}</td>
            <td className="text-center">
                <button
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                        setSelectedScreening(screening);
                        setScreeningDeleteModal((prev) => !prev);
                    }}
                >
                    Slet
                </button>
            </td>
        </tr>
    );
}

interface ScreeningListProps {
    screenings: IScreening[];
    setScreeningCreateModal: Dispatch<SetStateAction<boolean>>;
    setScreeningDeleteModal: Dispatch<SetStateAction<boolean>>;
    setSelectedScreening: Dispatch<SetStateAction<IScreening | null>>;
}
function ScreeningTable({
    screenings,
    setScreeningDeleteModal,
    setScreeningCreateModal,
    setSelectedScreening
}: ScreeningListProps) {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr className="border-b text-left">
                    <th className="p-2">Film</th>
                    <th>Biograf</th>
                    <th>Sal</th>
                    <th>Dato</th>
                    <th>Tid</th>
                    <th>Format</th>
                    <th className="text-center">
                        <button
                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => {
                                setScreeningCreateModal((prev) => !prev);
                            }}
                        >
                            Opret forestilling
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {screenings &&
                    screenings.map((screening) => (
                        <Screening
                            screening={screening}
                            setScreeningCreateModal={setScreeningCreateModal}
                            setScreeningDeleteModal={setScreeningDeleteModal}
                            setSelectedScreening={setSelectedScreening}
                            key={screening.id}
                        />
                    ))}
            </tbody>
        </table>
    );
}

function Screenings() {
    //const {screenings, getScreening, addScreening, updateScreening, deleteScreening} = useScreenings();
    const [screeningCreateModal, setScreeningCreateModal] = useState(false);
    const [screeningDeleteModal, setScreeningDeleteModal] = useState(false);
    const [selectedScreening, setSelectedScreening] = useState<IScreening | null>(null);

    const screenings: IScreening[] = [
        {
            id: 1,
            movie: {
                id: 2,
                name: "The Matrix"
            },
            hallNumber: 1,
            cinema: {
                id: 1,
                name: "Cinema City",
                movies: [
                    {
                        id: 1,
                        name: "Die Hard"
                    },
                    {
                        id: 2,
                        name: "The Matrix"
                    }
                ],
                halls: [1, 2]
            },
            date: "2021-10-10",
            time: "20:00",
            is3D: false
        },
        {
            id: 2,
            movie: {
                id: 1,
                name: "Die Hard"
            },
            hallNumber: 2,
            cinema: {
                id: 1,
                name: "Cinema City",
                movies: [
                    {
                        id: 1,
                        name: "Die Hard"
                    },
                    {
                        id: 2,
                        name: "The Matrix"
                    }
                ],
                halls: [1, 2]
            },
            date: "2021-10-10",
            time: "22:00",
            is3D: false
        },
        {
            id: 3,
            movie: {
                id: 2,
                name: "The Matrix"
            },
            cinema: {
                id: 1,
                name: "Cinema City",
                movies: [
                    {
                        id: 1,
                        name: "Die Hard"
                    },
                    {
                        id: 2,
                        name: "The Matrix"
                    }
                ],
                halls: [1, 2]
            },
            hallNumber: 1,
            date: "2021-10-10",
            time: "23:00",
            is3D: true
        }
    ];
    return (
        <PageLayout>
            <ScreeningTable
                screenings={screenings}
                setScreeningDeleteModal={setScreeningDeleteModal}
                setScreeningCreateModal={setScreeningCreateModal}
                setSelectedScreening={setSelectedScreening}
            />
            {screeningCreateModal && (
                <CreateModal
                    onSubmit={(screening: IScreeningFormData) => {
                        //TODO: Map IScreeningFormData to IScreening object, when backend is ready
                        //addScreening(screening);
                        console.log(screening);
                        setScreeningCreateModal(false);
                    }}
                    onClose={() => {
                        setScreeningCreateModal(false);
                    }}
                />
            )}
            {screeningDeleteModal && (
                <DeleteModal
                    onSubmit={() => {
                        //deleteScreening(selectedScreening.id);
                        console.log(selectedScreening);
                        setScreeningDeleteModal(false);
                        setSelectedScreening(null);
                    }}
                    onClose={() => {
                        setScreeningDeleteModal(false);
                        setSelectedScreening(null);
                    }}
                />
            )}
        </PageLayout>
    );
}

export default Screenings;
