import { IScreening } from "../../../types/types";


function screeningMockData(): IScreening {
    return {
        id: 1,
        cinema: {
            id: 1,
            name: "Cinema City",
            groupDiscount: 0.07,
            reservationFee: 5
        },
        movie: {
            id: 1,
            name: "The Shawshank Redemption"
        },
        hall: {
            id: 1,
            number: 1,
            seats: [
                {
                    id: 1,
                    seatNumber: 1,
                    rowName: "A",
                    reserved: false,
                    price: 8
                },
                {
                    id: 2,
                    seatNumber: 2,
                    rowName: "A",
                    reserved: false,
                    price: 8
                },
                {
                    id: 3,
                    seatNumber: 3,
                    rowName: "A",
                    reserved: false,
                    price: 8
                },
                {
                    id: 4,
                    seatNumber: 4,
                    rowName: "A",
                    reserved: true,
                    price: 8
                },
                {
                    id: 5,
                    seatNumber: 5,
                    rowName: "A",
                    reserved: false,
                    price: 8
                },
                {
                    id: 6,
                    seatNumber: 6,
                    rowName: "A",
                    reserved: true,
                    price: 8
                },
                {
                    id: 7,
                    seatNumber: 7,
                    rowName: "A",
                    reserved: false,
                    price: 8
                },
                {
                    id: 8,
                    seatNumber: 8,
                    rowName: "A",
                    reserved: false,
                    price: 8
                },
                {
                    id: 9,
                    seatNumber: 9,
                    rowName: "A",
                    reserved: false,
                    price: 8
                },
                {
                    id: 10,
                    seatNumber: 10,
                    rowName: "A",
                    reserved: false,
                    price: 8
                },
                {
                    id: 11,
                    seatNumber: 1,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 12,
                    seatNumber: 2,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 13,
                    seatNumber: 3,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 14,
                    seatNumber: 4,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 15,
                    seatNumber: 5,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 16,
                    seatNumber: 6,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 17,
                    seatNumber: 7,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 18,
                    seatNumber: 8,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 19,
                    seatNumber: 9,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 20,
                    seatNumber: 10,
                    rowName: "B",
                    reserved: false,
                    price: 8
                },
                {
                    id: 21,
                    seatNumber: 1,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    id: 22,
                    seatNumber: 2,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    id: 23,
                    seatNumber: 3,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    id: 24,
                    seatNumber: 4,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    id: 25,
                    seatNumber: 5,
                    rowName: "C",
                    reserved: true,
                    price: 10
                },
                {
                    id: 26,
                    seatNumber: 6,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    id: 27,
                    seatNumber: 7,
                    rowName: "C",
                    reserved: true,
                    price: 10
                },
                {
                    id: 28,
                    seatNumber: 8,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    id: 29,
                    seatNumber: 9,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    id: 30,
                    seatNumber: 10,
                    rowName: "C",
                    reserved: false,
                    price: 10
                }
            ]
        },
        date: "2021-07-01",
        time: "20:00",
        is3D: false
    }
}


export default screeningMockData;
