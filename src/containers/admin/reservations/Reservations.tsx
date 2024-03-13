import { Dispatch, SetStateAction, useState } from "react";
import PageLayout from "../../../components/PageLayout";
//import useReservations from "../../hooks/useReservations";
import type { IReservation, IScreening } from "../../../types/types";
import reservationMockData from "./data/reservationMockData";
import screeningMockData from "./data/screeningMockData";
import Modal from "../../../components/Modal";


interface IScreeningDeleteModalProps {
    onSubmit: () => void;
    onClose: () => void;
}
function DeleteModal({ onSubmit, onClose }: IScreeningDeleteModalProps) {
    return (
        <Modal>
            <h2 className="text-2xl p-4">
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
        <div className="flex-row gap-2 text-lg mx-5 mb-5">
            <div className="text-2xl font-bold">{screening.movie.name}</div>
            <div className="flex-row">
                <div>{screening.date} {screening.time}</div>
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

function Reservation({ reservation, setSelectedReservation, setReservationDeleteModal }: IReservationProps) {
    return (
        <div className="m-5">
            <div className="flex gap-2 my-2">
                <div className="font-bold">Reservations ID:</div>
                <div>{reservation.id}</div>
            </div>
            <div className="flex gap-5">
                <table className="table-auto w-96 border border-r">
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
                                <td>{ticket.seatNumber}{ticket.rowName}</td>
                                <td>{ticket.price},-</td>
                            </tr>
                        ))}
                        <tr className="font-semibold border-t">
                            <td>Samlet pris:</td>
                            <td>{reservation.tickets.reduce((acc, ticket) => acc + ticket.price, 0)},-</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex items-end">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
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
    //const { reservations, getReservation, deleteReservation } = useReservations();
    //const { screenings, getScreening } = useScreenings();
    const reservations: IReservation[] = reservationMockData();
    const screenings: IScreening[] = screeningMockData();

    const [reservationDeleteModal, setReservationDeleteModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<IReservation | null>(null);

    return (
        <PageLayout>
            {
                screenings.map((screening) => {
                    if (reservations.some((reservation) => reservation.screening.id === screening.id)) {
                        return (
                            <div key={screening.id}>
                                <ScreeningHeader screening={screening} />
                                {reservations.map((reservation) => {
                                    if (reservation.screening.id === screening.id) {
                                        return (
                                            <Reservation key={reservation.id} reservation={reservation} setSelectedReservation={setSelectedReservation} setReservationDeleteModal={setReservationDeleteModal} />
                                        )
                                    }
                                })}
                            </div>
                        );
                    }
                })
            }
            {reservationDeleteModal && (
                <DeleteModal
                    onSubmit={() => {
                        //deleteReservation(selectedReservation.id);
                        console.log(selectedReservation);
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