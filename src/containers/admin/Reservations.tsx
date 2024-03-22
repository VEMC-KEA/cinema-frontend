import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout.tsx";
import type { IReservation, IScreening } from "../../types/types.ts";
import Modal from "../../components/Modal.tsx";
import useReservations from "../../hooks/useReservations.ts";
import useScreenings from "../../hooks/useScreenings.ts";
import { MdSearch } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Search({
    setSearchedReservation
}: {
    setSearchedReservation: Dispatch<SetStateAction<number | null>>;
}) {
    return (
        <div className="flex bg-white border-t fixed right-0 rounded-bl-xl w-80 flex-gap-2 p-3 items-center border-l border-b">
            <input
                type="text"
                placeholder="Søg efter reservation"
                className="p-3 bg-transparent rounded text-xl outline-0"
                onChange={(e) => {
                    if (e.target.value.length === 0)
                        setSearchedReservation(null);
                    setSearchedReservation(parseInt(e.target.value));
                }}
            />
            <MdSearch className="text-4xl text-gray-400" />
        </div>
    );
}

interface IScreeningDeleteModalProps {
    onSubmit: () => void;
    onClose: () => void;
}

function DeleteModal({ onSubmit, onClose }: IScreeningDeleteModalProps) {
    return (
        <Modal>
            <h2 className="p-4 text-2xl">
                Er du sikker på at du vil slette denne reservation?
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

function ScreeningHeader({ screening }: { screening: IScreening }) {
    return (
        <div className="flex-row gap-2 text-lg p-5 w-full border-t border-b">
            <div className="text-4xl font-bold">{screening.movie.title}</div>
            <div className="flex-row text-xl">
                <div>
                    {screening.date} {screening.time}
                </div>
                <div>{screening.cinema.name}</div>
            </div>
        </div>
    );
}

interface IReservationProps {
    reservation: IReservation;
    setSelectedReservation: Dispatch<SetStateAction<IReservation | null>>;
    setReservationDeleteModal: Dispatch<SetStateAction<boolean>>;
}

function Reservation({
    reservation,
    setSelectedReservation,
    setReservationDeleteModal
}: IReservationProps) {
    const [isHidden, setIsHidden] = useState(true);
    return (
        <div className="w-full text-xl bg-zinc-200 hover:bg-zinc-300">
            <div
                className="flex p-4 gap-2 justify-between cursor-pointer"
                onClick={() => setIsHidden((prev) => !prev)}
            >
                <div className="font-bold">
                    Reservations ID:{" "}
                    <span className="font-semibold">{reservation.id}</span>
                </div>
                <div>
                    {isHidden && <IoIosArrowDown />}
                    {!isHidden && <IoIosArrowUp />}
                </div>
            </div>
            {!isHidden && (
                <div className="flex gap-5 p-4">
                    <table className="table-auto min-w-80">
                        <thead>
                            <tr className="text-left">
                                <th>Sæde</th>
                                <th>Pris</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservation.tickets.map((ticket) => (
                                <tr
                                    key={ticket.id}
                                    className="border-b border-zinc-50"
                                >
                                    <td>
                                        {ticket.number}
                                        {ticket.rowLetter}
                                    </td>
                                    <td>{ticket.price},-</td>
                                </tr>
                            ))}
                            <tr className="font-semibold border-t">
                                <td>Samlet pris:</td>
                                <td>
                                    {reservation.tickets.reduce(
                                        (acc, ticket) => acc + ticket.price,
                                        0
                                    )}
                                    ,-
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex items-end">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setSelectedReservation(reservation);
                                setReservationDeleteModal((prev) => !prev);
                            }}
                        >
                            Slet
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Reservations() {
    const { reservations, destroy: deleteReservation } = useReservations();
    const { screenings } = useScreenings();

    const [reservationDeleteModal, setReservationDeleteModal] = useState(false);
    const [selectedReservation, setSelectedReservation] =
        useState<IReservation | null>(null);
    const [searchedReservationId, setSearchedReservationId] = useState<
        number | null
    >(null);
    const [searchedReservation, setSearchedReservation] =
        useState<IReservation | null>(null);

    useEffect(() => {
        if (!searchedReservationId) {
            setSearchedReservation(null);
            return;
        }
        setSearchedReservation(
            reservations.find(
                (reservation) => reservation.id === searchedReservationId
            ) || null
        );
    }, [searchedReservationId]);

    return (
        <PageLayout>
            <Search setSearchedReservation={setSearchedReservationId} />
            {searchedReservation && (
                <>
                    <ScreeningHeader
                        screening={searchedReservation.screening}
                    />
                    <Reservation
                        reservation={searchedReservation}
                        setSelectedReservation={setSelectedReservation}
                        setReservationDeleteModal={setReservationDeleteModal}
                    />
                </>
            )}
            {!searchedReservation &&
                screenings.map((screening) => {
                    if (
                        reservations.some(
                            (reservation) =>
                                reservation.screening.id === screening.id
                        )
                    ) {
                        return (
                            <div key={screening.id}>
                                <ScreeningHeader screening={screening} />
                                <div className="flex flex-col gap-2">
                                    {reservations.map((reservation) => {
                                        if (
                                            reservation.screening.id ===
                                            screening.id
                                        ) {
                                            return (
                                                <Reservation
                                                    key={reservation.id}
                                                    reservation={reservation}
                                                    setSelectedReservation={
                                                        setSelectedReservation
                                                    }
                                                    setReservationDeleteModal={
                                                        setReservationDeleteModal
                                                    }
                                                />
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        );
                    }
                })}
            {reservationDeleteModal && (
                <DeleteModal
                    onSubmit={() => {
                        if (selectedReservation)
                            void deleteReservation(selectedReservation.id);
                        setReservationDeleteModal(false);
                        setSelectedReservation(null);
                    }}
                    onClose={() => {
                        setReservationDeleteModal(false);
                        setSelectedReservation(null);
                    }}
                />
            )}
        </PageLayout>
    );
}

export default Reservations;
