import { IScreening } from "../../../../types/types";

function screeningMockData(): IScreening[] {
    return [
        {
            id: 1,
            movie: {
                id: 2,
                name: "The Matrix"
            },
            hallNumber: 1,
            cinema: {
                id: 1,
                name: "Cinema City",
                movies: [
                    {
                        id: 1,
                        name: "Die Hard"
                    },
                    {
                        id: 2,
                        name: "The Matrix"
                    }
                ],
                halls: [1, 2]
            },
            date: "2021-10-10",
            time: "20:00",
            is3D: false
        },
        {
            id: 2,
            movie: {
                id: 1,
                name: "Die Hard"
            },
            hallNumber: 2,
            cinema: {
                id: 1,
                name: "Cinema City",
                movies: [
                    {
                        id: 1,
                        name: "Die Hard"
                    },
                    {
                        id: 2,
                        name: "The Matrix"
                    }
                ],
                halls: [1, 2]
            },
            date: "2021-10-10",
            time: "22:00",
            is3D: false
        },
        {
            id: 3,
            movie: {
                id: 2,
                name: "The Matrix"
            },
            cinema: {
                id: 1,
                name: "Cinema City",
                movies: [
                    {
                        id: 1,
                        name: "Die Hard"
                    },
                    {
                        id: 2,
                        name: "The Matrix"
                    }
                ],
                halls: [1, 2]
            },
            hallNumber: 1,
            date: "2021-10-10",
            time: "23:00",
            is3D: true
        }
    ];
}

export default screeningMockData;