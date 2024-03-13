interface IShow {
    id?: number;
    movie: IMovie;
    cinema: ICinema;
    hallNumber: number;
    date: string;
    time: string;
    is3D: boolean;
}

interface IShowFormData {
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
    rowNumber: number;
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

export type { IShow, IShowFormData, ICinema, IMovie, IReservation, ITicket };
