interface IScreening {
    id?: number;
    movie: IMovieShortForm;
    hall: IHallShortFormWithSeats;
    cinema: ICinemaShortForm;
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

interface IHallShortForm {
    id: number;
    number: number;
}

interface ISeatShortForm {
    seatNumber: number;
    rowNumber: number;
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
    cinema: { id: number, name: string };
    movie: { id: number, title: string };
    hall: { id: number, number: number };
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
    IReservation, ITicket, IReservationScreening
};
