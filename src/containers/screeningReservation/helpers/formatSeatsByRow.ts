import { IScreening, ISeatShortForm } from "../../../types/types";

function formatSeatsByRow(screening: IScreening) {
    const seatsByRow: { [rowName: string]: ISeatShortForm[]; } = {};

    screening.hall.seats.forEach((seat) => {
        if (!seatsByRow[seat.rowName]) {
            seatsByRow[seat.rowName] = [];
        }
        seatsByRow[seat.rowName].push(seat);
    });

    Object.keys(seatsByRow).forEach((rowName) => {
        let row = seatsByRow[rowName];
        let evenSeatNumbers: ISeatShortForm[] = [];
        let unevenSeatNumbers: ISeatShortForm[] = [];
        row.forEach((seat) => {
            if (seat.seatNumber % 2 === 0) {
                evenSeatNumbers.push(seat);
            }
            if (seat.seatNumber % 2 === 1) {
                unevenSeatNumbers.push(seat);
            }
        });
        evenSeatNumbers.sort((a, b) => b.seatNumber - a.seatNumber);
        seatsByRow[rowName] = [...evenSeatNumbers, ...unevenSeatNumbers];
    });
    return seatsByRow;
}

export default formatSeatsByRow;