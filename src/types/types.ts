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

export type {
    IScreening,
    IScreeningFormData,
    ICinema,
    IMovieShortForm,
    IHallShortForm
};
