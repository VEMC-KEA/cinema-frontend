import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout.tsx";
import type { IReservation, IScreening } from "../../types/types.ts";
import Modal from "../../components/Modal.tsx";
import useReservations from "../../hooks/useReservations.ts";
import useScreenings from "../../hooks/useScreenings.ts";

function Search({
    setSearchedReservation
}: {
    setSearchedReservation: Dispatch<SetStateAction<number | null>>;
}) {
    return (
        <div className="p-5">
            <input
                type="text"
                placeholder="Søg efter reservation"
                className="p-2 border border-gray-400 rounded text-xl"
                onChange={(e) => {
                    if (e.target.value.length === 0)
                        setSearchedReservation(null);
                    setSearchedReservation(parseInt(e.target.value));
                }}
            />
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
        <div className="flex-row gap-2 text-lg px-5 pt-16 w-full">
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
    return (
        <div className="px-5 w-full text-xl">
            <div className="flex gap-2 my-2">
                <div className="font-bold">Reservations ID:</div>
                <div>{reservation.id}</div>
            </div>
            <div className="flex gap-5">
                <table className="table-auto w-5/6 border border-r">
                    <thead>
                        <tr className="text-left">
                            <th>Sæde</th>
                            <th>Pris</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservation.tickets.map((ticket) => (
                            <tr key={ticket.id}>
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
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                        onClick={() => {
                            setSelectedReservation(reservation);
                            setReservationDeleteModal((prev) => !prev);
                        }}
                    >
                        Slet reservation
                    </button>
                </div>
            </div>
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
                        );
                    }
                })}
            {reservationDeleteModal && (
                <DeleteModal
                    onSubmit={() => {
                        if (selectedReservation)
                            deleteReservation(selectedReservation.id);
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
