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
            title: "The Shawshank Redemption"
        },
        hall: {
            id: 1,
            number: 1,
            seats: [
                {
                    id: 1,
                    number: 1,
                    rowLetter: "A"
                },
                {
                    id: 2,
                    number: 2,
                    rowLetter: "A"
                },
                {
                    id: 3,
                    number: 3,
                    rowLetter: "A"
                },
                {
                    id: 4,
                    number: 4,
                    rowLetter: "A"
                },
                {
                    id: 5,
                    number: 5,
                    rowLetter: "A"
                },
                {
                    id: 6,
                    number: 6,
                    rowLetter: "A"
                },
                {
                    id: 7,
                    number: 7,
                    rowLetter: "A"
                },
                {
                    id: 8,
                    number: 8,
                    rowLetter: "A"
                },
                {
                    id: 9,
                    number: 9,
                    rowLetter: "A"
                },
                {
                    id: 10,
                    number: 10,
                    rowLetter: "A"
                },
                {
                    id: 11,
                    number: 1,
                    rowLetter: "B"
                },
                {
                    id: 12,
                    number: 2,
                    rowLetter: "B"
                },
                {
                    id: 13,
                    number: 3,
                    rowLetter: "B"
                },
                {
                    id: 14,
                    number: 4,
                    rowLetter: "B"
                },
                {
                    id: 15,
                    number: 5,
                    rowLetter: "B"
                },
                {
                    id: 16,
                    number: 6,
                    rowLetter: "B"
                },
                {
                    id: 17,
                    number: 7,
                    rowLetter: "B"
                },
                {
                    id: 18,
                    number: 8,
                    rowLetter: "B"
                },
                {
                    id: 19,
                    number: 9,
                    rowLetter: "B"
                },
                {
                    id: 20,
                    number: 10,
                    rowLetter: "B"
                },
                {
                    id: 21,
                    number: 1,
                    rowLetter: "C"
                },
                {
                    id: 22,
                    number: 2,
                    rowLetter: "C"
                },
                {
                    id: 23,
                    number: 3,
                    rowLetter: "C"
                },
                {
                    id: 24,
                    number: 4,
                    rowLetter: "C"
                },
                {
                    id: 25,
                    number: 5,
                    rowLetter: "C"
                },
                {
                    id: 26,
                    number: 6,
                    rowLetter: "C"
                },
                {
                    id: 27,
                    number: 7,
                    rowLetter: "C"
                },
                {
                    id: 28,
                    number: 8,
                    rowLetter: "C"
                },
                {
                    id: 29,
                    number: 9,
                    rowLetter: "C"
                },
                {
                    id: 30,
                    number: 10,
                    rowLetter: "C"
                }
            ]
        },
        date: "2021-07-01",
        time: "20:00",
        is3D: false
    }
}


export default screeningMockData;
