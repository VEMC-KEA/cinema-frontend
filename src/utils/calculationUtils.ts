import { ISeatShortForm } from "../types/types.ts";

function calcTotal(
    selectedSeats: ISeatShortForm[],
    groupDiscount: number,
    reservationFee: number,
    movieBasePrice: number
) {
    console.log(selectedSeats, groupDiscount, reservationFee, movieBasePrice);
    let total = selectedSeats.reduce((acc) => acc + movieBasePrice, 0);
    if (selectedSeats.length >= 10)
        total = Math.floor(total - total * groupDiscount);
    if (selectedSeats.length <= 5) total = total + reservationFee;
    return total;
}

export { calcTotal };
