export interface Movies {
  page: number
  results: Movie[]
  total_results: number
  total_pages: number
}

export interface Movie {
  poster_path: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface MovieDetailsResponse {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: any
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number //ingresos
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path?: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
}

export interface MovieVideoResponse {
  id: number
  results: MovieVideo[]
}

export interface MovieVideo {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface RatedMoviesResponse {
  page: number
  results: RatedMovie[]
  total_pages: number
  total_results: number
}

export interface RatedMovie {
  adult: boolean
  backdrop_path: any
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  release_date: string
  poster_path: any
  popularity: number
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  rating: number
}

export interface FilmRatedResponse {
  success:        boolean;
  status_code:    number;
  status_message: string;
}
