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
}

interface IMovie {
    id: number;
    name: string;
}

export type { IShow, IShowFormData, ICinema, IMovie };
