import PageLayout from "../../components/PageLayout";
//import useReservations from "../../hooks/useReservations";
import type { IReservation } from "../../types/types";
import mockData from "./data/reservationMockData";

function ReservationTable() {
    return (
        <table>
            <thead>
                <tr>
                    <th>Reservations ID</th>
                    <th>Billetter</th>
                    <th>Forestillings ID?</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    );
}


function Reservations() {
    //const { reservations, getReservation, deleteReservation } = useReservations();
    const reservations: IReservation[] = mockData();

    return (
        <PageLayout>
            <ReservationTable />
        </PageLayout>
    );
}

export default Reservations;