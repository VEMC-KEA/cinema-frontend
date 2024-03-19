import { IScreening, ISeatShortForm } from "../../../types/types";

function formatSeatsByRow(screening: IScreening) {
    const seatsByRow: { [rowName: string]: ISeatShortForm[]; } = {};
    console.log(screening);

    screening.hall.seats.forEach((seat) => {
        if (!seatsByRow[seat.rowLetter]) {
            seatsByRow[seat.rowLetter] = [];
        }
        seatsByRow[seat.rowLetter].push(seat);
    });

    Object.keys(seatsByRow).forEach((rowLetter) => {
        let row = seatsByRow[rowLetter];
        let evenSeatNumbers: ISeatShortForm[] = [];
        let unevenSeatNumbers: ISeatShortForm[] = [];
        row.forEach((seat) => {
            if (seat.number % 2 === 0) {
                evenSeatNumbers.push(seat);
            }
            if (seat.number % 2 === 1) {
                unevenSeatNumbers.push(seat);
            }
        });
        evenSeatNumbers.sort((a, b) => b.number - a.number);
        seatsByRow[rowLetter] = [...evenSeatNumbers, ...unevenSeatNumbers];
    });
    return seatsByRow;
}

export default formatSeatsByRow;