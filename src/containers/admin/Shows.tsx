import PageLayout from "../../components/PageLayout.tsx";
import type { IShow } from "../../types/types.ts";
import Modal from "../../components/Modal.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import ShowForm from "./components/ShowForm.tsx";
//import useShows from "../hooks/useShows.ts";

interface IShowEditModalProps {
    show: IShow | null;
    onSubmit: (show: IShow) => void;
    onClose: () => void;
}
function EditModal({ show, onSubmit, onClose }: IShowEditModalProps) {
    console.log(show);
    return (
        <Modal>
            <ShowForm
                selectedShow={show}
                onSubmit={onSubmit}
                title={"Redigér forestilling"}
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

interface IShowProps {
    show: IShow;
    setShowEditModal: Dispatch<SetStateAction<boolean>>;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    setSelectedShow: Dispatch<SetStateAction<IShow | null>>;
}
function Show({
    show,
    setShowEditModal,
    setShowDeleteModal,
    setSelectedShow
}: IShowProps) {
    return (
        <tr className="border-b">
            <td className="p-1">{show.movie.name}</td>
            <td>{show.cinema.name}</td>
            <td>{show.hallNumber}</td>
            <td>{show.date}</td>
            <td>{show.time}</td>
            <td>{show.is3D ? "3D" : "2D"}</td>
            <td className="flex gap-2">
                <button
                    className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                        setSelectedShow(show);
                        setShowEditModal((prev) => !prev);
                    }}
                >
                    Rediger
                </button>
                <button
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                        setSelectedShow(show);
                        setShowDeleteModal((prev) => !prev);
                    }}
                >
                    Slet
                </button>
            </td>
        </tr>
    );
}

interface ShowListProps {
    shows: IShow[];
    setShowEditModal: Dispatch<SetStateAction<boolean>>;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    setSelectedShow: Dispatch<SetStateAction<IShow | null>>;
}
function ShowTable({
    shows,
    setShowDeleteModal,
    setShowEditModal,
    setSelectedShow
}: ShowListProps) {
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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {shows &&
                    shows.map((show) => (
                        <Show
                            show={show}
                            setShowEditModal={setShowEditModal}
                            setShowDeleteModal={setShowDeleteModal}
                            setSelectedShow={setSelectedShow}
                            key={show.id}
                        />
                    ))}
            </tbody>
        </table>
    );
}

function Shows() {
    //const {shows, getShow, addShow, updateShow, deleteShow} = useShows();
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedShow, setSelectedShow] = useState<IShow | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const shows: IShow[] = [
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
                ]
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
                ]
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
                ]
            },
            hallNumber: 1,
            date: "2021-10-10",
            time: "23:00",
            is3D: true
        }
    ];
    return (
        <PageLayout>
            <ShowTable
                shows={shows}
                setShowDeleteModal={setShowDeleteModal}
                setShowEditModal={setShowEditModal}
                setSelectedShow={setSelectedShow}
            />
            {showEditModal && (
                <EditModal
                    show={selectedShow}
                    onSubmit={(show: IShow) => {
                        //updateShow(show);
                        console.log(show);
                        setShowEditModal(false);
                        setSelectedShow(null);
                    }}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedShow(null);
                    }}
                />
            )}
        </PageLayout>
    );
}

export default Shows;
