import { Genre } from "./genre.model";

export interface MovieDetails
{
    adult: boolean;
    backdrop_path: string;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

    belongs_to_collection:
    {
      id: number;
      name: string;
      poster_path: string;
      backdrop_path: string;
    };

    spoken_languages:
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];

    production_countries:
    {
      iso_3166_1: string;
      name: string;
    }[];

    production_companies:
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[];
}