interface IScreening {
    id?: number;
    movie: IMovie;
    cinema: ICinema;
    hallNumber: number;
    date: string;
    time: string;
    is3D: boolean;
}

interface IScreeningFormData {
    movie?: IMovie;
    cinema?: ICinema;
    hallNumber?: number;
    date?: string;
    time?: string;
    is3D?: boolean;
}

interface ICinema {
    id: number;
    name: string;
    movies: IMovie[];
    halls: number[];
}

interface IMovie {
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

export type { IScreening, IScreeningFormData, ICinema, IMovie, IReservation, ITicket, IReservationScreening };
