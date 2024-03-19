import PageLayout from "../../components/PageLayout.tsx";
import type { IScreening, IScreeningFormData } from "../../types/types.ts";
import Modal from "../../components/Modal.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import ScreeningForm from "./components/ScreeningForm.tsx";
import { SubmitHandler } from "react-hook-form";
//import useScreenings from "../hooks/useScreenings.ts";

interface ICreateModalProps {
    onSubmit: SubmitHandler<IScreeningFormData>;
    onClose: () => void;
}
function CreateModal({ onSubmit, onClose }: ICreateModalProps) {
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

interface IDeleteModalProps {
    onSubmit: () => void;
    onClose: () => void;
}
function DeleteModal({ onSubmit, onClose }: IDeleteModalProps) {
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
    setShowCreateModal: Dispatch<SetStateAction<boolean>>;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    setSelectedScreening: Dispatch<SetStateAction<IScreening | null>>;
}
function Screening({
    screening,
    setShowDeleteModal,
    setSelectedScreening
}: IScreeningProps) {
    return (
        <tr className="border-b">
            <td className="p-1">{screening.movie.title}</td>
            <td>{screening.cinema.name}</td>
            <td>{screening.hall.number}</td>
            <td>{screening.date}</td>
            <td>{screening.time}</td>
            <td>{screening.is3D ? "3D" : "2D"}</td>
            <td className="text-center">
                <button
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                        setSelectedScreening(screening);
                        setShowDeleteModal((prev) => !prev);
                    }}
                >
                    Slet
                </button>
            </td>
        </tr>
    );
}

interface ScreeningTableProps {
    screenings: IScreening[];
    setShowCreateModal: Dispatch<SetStateAction<boolean>>;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    setSelectedScreening: Dispatch<SetStateAction<IScreening | null>>;
}
function ScreeningTable({
    screenings,
    setShowDeleteModal,
    setShowCreateModal,
    setSelectedScreening
}: ScreeningTableProps) {
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
                                setShowCreateModal((prev) => !prev);
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
                            setShowCreateModal={setShowCreateModal}
                            setShowDeleteModal={setShowDeleteModal}
                            setSelectedScreening={setSelectedScreening}
                            key={screening.id}
                        />
                    ))}
            </tbody>
        </table>
    );
}

function Screenings() {
    //const {screenings, getById, add, update, destroy} = useScreening();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedScreening, setSelectedScreening] =
        useState<IScreening | null>(null);

    const screenings: IScreening[] = [
        {
            id: 1,
            movie: {
                id: 2,
                title: "The Matrix"
            },
            hall: {
                id: 1,
                number: 1,
                seats: []
            },
            cinema: {
                id: 1,
                name: "Cinema City",
                groupDiscount: 0.07,
                reservationFee: 5
            },
            date: "2021-10-10",
            time: "20:00",
            is3D: false
        },
        {
            id: 2,
            movie: {
                id: 1,
                title: "Die Hard"
            },
            hall: {
                id: 1,
                number: 1,
                seats: []
            },
            cinema: {
                id: 1,
                name: "Cinema City",
                groupDiscount: 0.07,
                reservationFee: 5
            },
            date: "2021-10-10",
            time: "22:00",
            is3D: false
        },
        {
            id: 3,
            movie: {
                id: 2,
                title: "The Matrix"
            },
            cinema: {
                id: 1,
                name: "Cinema City",
                groupDiscount: 0.07,
                reservationFee: 5
            },
            hall: {
                id: 1,
                number: 1,
                seats: []
            },
            date: "2021-10-10",
            time: "23:00",
            is3D: true
        }
    ];
    return (
        <PageLayout>
            <ScreeningTable
                screenings={screenings}
                setShowDeleteModal={setShowDeleteModal}
                setShowCreateModal={setShowCreateModal}
                setSelectedScreening={setSelectedScreening}
            />
            {showCreateModal && (
                <CreateModal
                    onSubmit={(screening: IScreeningFormData) => {
                        //TODO: Map IScreeningFormData to IScreening object, when backend is ready
                        //add(screening);
                        console.log(screening);
                        setShowCreateModal(false);
                    }}
                    onClose={() => {
                        setShowCreateModal(false);
                    }}
                />
            )}
            {showDeleteModal && (
                <DeleteModal
                    onSubmit={() => {
                        //destroy(selectedScreening.id);
                        console.log(selectedScreening);
                        setShowDeleteModal(false);
                        setSelectedScreening(null);
                    }}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedScreening(null);
                    }}
                />
            )}
        </PageLayout>
    );
}

export default Screenings;
