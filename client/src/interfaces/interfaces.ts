export interface Movie {
    id: number;
    title: string;
    year: number;
    rating: number;
    description: string;
    uri: string;
}

export interface Serie {
    id: number
    title: string
    year: string
    rating: number
    description: string
    episodes: [Movie]
}

export interface Collection {
    movies: Movie[]
    series: Serie[]
}