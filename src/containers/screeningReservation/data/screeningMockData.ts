import { IScreening } from "../../../types/types";


function screeningMockData(): IScreening {
    return {
        id: 1,
        cinema: {
            id: 1,
            name: "Cinema City"
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
                    seatNumber: 1,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 2,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 3,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 4,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 5,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 6,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 7,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 8,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 9,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 10,
                    rowName: "A",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 1,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 2,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 3,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 4,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 5,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 6,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 7,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 8,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 9,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 10,
                    rowName: "B",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 1,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 2,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 3,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 4,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 5,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 6,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 7,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 8,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
                    seatNumber: 9,
                    rowName: "C",
                    reserved: false,
                    price: 10
                },
                {
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
