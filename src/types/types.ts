interface IScreening {
    id?: number;
    movie: IMovieShortForm;
    hall: IHallShortFormWithSeats;
    cinema: ICinemaScreening;
    date: string;
    time: string;
    is3d: boolean;
    reservations?: IReservationTickets[];
}

interface IReservationTickets {
    tickets: ITicket[];
}

interface IScreeningFormData {
    movie?: IMovieShortForm;
    cinema?: ICinemaShortForm;
    hall?: IHallShortForm;
    date?: string;
    time?: string;
    is3d?: boolean;
}

interface ICinema {
    id: number;
    name: string;
    imageUrl: string;
    groupDiscount: number;
    movieBasePrice: number;
    reservationFee: number;
    movies: IMovieShortForm[];
    halls: IHallShortForm[];
}

interface ICinemaShortForm {
    id: number;
    name: string;
}

interface ICinemaScreening {
    id: number;
    name: string;
    groupDiscount: number;
    reservationFee: number;
}

interface IHallShortForm {
    id: number;
    number: number;
}

interface IHall {
    id: number;
    number: number;
    seats: ISeatShortForm[];
}

interface ISeatShortForm {
    id: number;
    number: number;
    rowLetter: string;
}

interface IMovie {
    id: number;
    runTime: number;
    isClassic: boolean;
    genre: string;
    pg13: boolean;
    title: string;
    imageUrl: string;
}

interface IHallShortFormWithSeats extends IHallShortForm {
    seats: ISeatShortForm[];
}

interface IMovieShortForm {
    id: number;
    title: string;
}

interface IReservation {
    id: number;
    tickets: ITicket[];
    screening: IScreening;
    completed: boolean;
}

interface ITicket {
    id: number;
    seatId: number;
    rowLetter: string;
    number: number;
    price: number;
}

interface IReservationScreening {
    id: number | string;
    cinema: ICinemaShortForm;
    movie: IMovieShortForm;
    hall: IHallShortForm;
    date: string;
    time: string;
    is3d: boolean;
}

export type {
    IScreening,
    IScreeningFormData,
    ICinema,
    IMovieShortForm,
    IHallShortForm,
    ISeatShortForm,
    IReservation,
    ITicket,
    IReservationScreening,
    IMovie,
    IHall
};
