import { IReservation } from "../../../types/types";

function reservationMockData(): IReservation[] {
    return [
        {
            id: 1,
            tickets: [
                { id: 1, seatNumber: 1, rowNumber: 1, price: 10 },
                { id: 2, seatNumber: 2, rowNumber: 1, price: 10 }
            ],
            screening: {
                id: 1,
                cinema: {
                    id: 1,
                    name: "Cinema City"
                },
                movie: {
                    id: 1,
                    title: "The Shawshank Redemption"
                },
                hall: {
                    id: 1,
                    number: 1
                },
                date: "2021-07-01",
                time: "20:00",
                is3D: false
            },
            completed: false
        },
        {
            id: 2,
            tickets: [
                { id: 3, seatNumber: 3, rowNumber: 2, price: 15 },
                { id: 4, seatNumber: 4, rowNumber: 2, price: 15 }
            ],
            screening: {
                id: 2,
                cinema: {
                    id: 2,
                    name: "Cineplex"
                },
                movie: {
                    id: 2,
                    title: "The Godfather"
                },
                hall: {
                    id: 2,
                    number: 2
                },
                date: "2021-07-02",
                time: "18:00",
                is3D: true
            },
            completed: true
        },
        {
            id: 3,
            tickets: [
                { id: 5, seatNumber: 5, rowNumber: 3, price: 20 },
                { id: 6, seatNumber: 6, rowNumber: 3, price: 20 }
            ],
            screening: {
                id: 3,
                cinema: {
                    id: 3,
                    name: "Regal Cinemas"
                },
                movie: {
                    id: 3,
                    title: "Pulp Fiction"
                },
                hall: {
                    id: 3,
                    number: 3
                },
                date: "2021-07-03",
                time: "21:00",
                is3D: false
            },
            completed: false
        },
        {
            id: 4,
            tickets: [
                { id: 7, seatNumber: 7, rowNumber: 4, price: 25 },
                { id: 8, seatNumber: 8, rowNumber: 4, price: 25 }
            ],
            screening: {
                id: 4,
                cinema: {
                    id: 4,
                    name: "AMC Theatres"
                },
                movie: {
                    id: 4,
                    title: "Fight Club"
                },
                hall: {
                    id: 4,
                    number: 4
                },
                date: "2021-07-04",
                time: "19:00",
                is3D: true
            },
            completed: false
        }
    ];
}

export default reservationMockData;