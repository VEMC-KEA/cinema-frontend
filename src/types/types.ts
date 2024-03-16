interface IScreening {
    id?: number;
    movie: IMovieShortForm;
    hall: IHallShortFormWithSeats;
    cinema: ICinemaScreening;
    date: string;
    time: string;
    is3D: boolean;
}

interface IScreeningFormData {
    movie?: IMovieShortForm;
    cinema?: ICinemaShortForm;
    hall?: IHallShortForm;
    date?: string;
    time?: string;
    is3D?: boolean;
}

interface ICinema {
    id: number;
    name: string;
    imageUrl: string;
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

interface ISeatShortForm {
    id: number;
    seatNumber: number;
    rowName: string;
    reserved: boolean;
    price: number;
}

interface IHallShortFormWithSeats extends IHallShortForm {
    seats: ISeatShortForm[];
}

interface IMovieShortForm {
    id: number;
    name: string;
}
interface IReservation {
    id: number;
    tickets: ITicket[];
    screening: IReservationScreening;
    completed: boolean;
}

interface ITicket {
    id: number;
    seatNumber: number;
    rowName: string;
    price: number;
}

interface IReservationScreening {
    id: number | string;
    cinema: ICinemaShortForm;
    movie: IMovieShortForm;
    hall: IHallShortForm;
    date: string;
    time: string;
    is3D: boolean;
}

export type {
    IScreening,
    IScreeningFormData,
    ICinema,
    IMovieShortForm,
    IHallShortForm,
    ISeatShortForm,
    IReservation, ITicket, IReservationScreening
};
