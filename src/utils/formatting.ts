import { IScreening, ISeatShortForm } from "../types/types.ts";

function formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("da-DK", {
        weekday: "short",
        day: "numeric",
        month: "numeric"
    });
}

function formatTime(time: string) {
    return time.slice(0, 5);
}

function formatSeatsByRow(screening: IScreening) {
    const seatsByRow: { [rowName: string]: ISeatShortForm[] } = {};
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

export { formatDate, formatTime, formatSeatsByRow };
