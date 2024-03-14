import { IReservationScreening } from "../../../../types/types";


function screeningMockData(): IReservationScreening[] {
    return [
        {
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
                number: 1
            },
            date: "2021-07-01",
            time: "20:00",
            is3D: false
        },
        {
            id: 2,
            cinema: {
                id: 2,
                name: "Cineplex"
            },
            movie: {
                id: 2,
                name: "The Godfather"
            },
            hall: {
                id: 2,
                number: 2
            },
            date: "2021-07-02",
            time: "18:00",
            is3D: true
        },
        {
            id: 3,
            cinema: {
                id: 3,
                name: "Regal Cinemas"
            },
            movie: {
                id: 3,
                name: "Pulp Fiction"
            },
            hall: {
                id: 3,
                number: 3
            },
            date: "2021-07-03",
            time: "21:00",
            is3D: false
        }
    ];
}

export default screeningMockData;
