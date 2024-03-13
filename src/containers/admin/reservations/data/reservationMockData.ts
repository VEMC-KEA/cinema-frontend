import { IReservation } from "../../../../types/types";

function reservationMockData(): IReservation[] {
    return [
        {
            id: 1,
            tickets: [
                { id: 1, seatNumber: 1, rowName: "A", price: 10 },
                { id: 2, seatNumber: 2, rowName: "A", price: 10 }
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
                { id: 3, seatNumber: 3, rowName: "B", price: 15 },
                { id: 4, seatNumber: 4, rowName: "B", price: 15 }
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
                { id: 5, seatNumber: 5, rowName: "C", price: 20 },
                { id: 6, seatNumber: 6, rowName: "C", price: 20 }
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
                { id: 7, seatNumber: 7, rowName: "D", price: 25 },
                { id: 8, seatNumber: 8, rowName: "D", price: 25 }
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
        }
    ];
}

export default reservationMockData;
