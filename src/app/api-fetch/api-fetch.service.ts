import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Genre } from '../models/genre.model';
import { Movie } from '../models/movie.model';
import { Cast } from '../models/cast.model';
import { MovieDetails } from '../models/movieDetails.model';

@Injectable
({
  providedIn: 'root',
})
export class ApiFetchService 
{
  baseApiUrl: string = 'https://api.themoviedb.org/3';

  httpOptions =
  {
    headers: new HttpHeaders
    ({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTg3NzAzNGFlNjdjYTljZDc0ZWI3YzRjNGVjYzZhNSIsInN1YiI6IjY1NjBhYWU0MmIxMTNkMDBjYTUwM2RlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qvaCsa0O8l5Y_1AI-nCksVpBapmSdxeETh043nxgbjM',
    }),
  };

  constructor(private httpClient: HttpClient) 
  {

  }

  fetchGenres(): Observable<Genre[]>
  {
    let genreListEndPoint = '/genre/movie/list?language=en';
    return this.httpClient
      .get<{ genres: Genre[] }>
      (
        this.baseApiUrl + genreListEndPoint,
        this.httpOptions
      )
      .pipe(map((response) => response.genres));
  }

  fetchMoviesByGenre(genre_id: number, pageNum: number): Observable<Movie[]>
  {
    let MoviesByGenresEndPoint = `/discover/movie?include_adult=false&include_video=false&language=en&page=${pageNum}&sort_by=popularity.desc&with_genres=${genre_id}`;
    return this.httpClient
      .get<{ results: Movie[] }>
      (
        this.baseApiUrl + MoviesByGenresEndPoint,
        this.httpOptions
      )
      .pipe(map((response) => response.results));
  }

  fetchNowPlaying(pageNum: number): Observable<Movie[]>
  {
    let nowPlayingEndPoint = `/movie/now_playing?language=en-US&page=${pageNum}`;
    return this.httpClient
      .get<{ results: Movie[] }>
      (
        this.baseApiUrl + nowPlayingEndPoint,
        this.httpOptions
      )
      .pipe(map((response) => response.results));
  }

  fetchPopular(pageNum: number): Observable<Movie[]>
  {
    let popularEndPoint = `/movie/popular?language=en-US&page=${pageNum}`;
    return this.httpClient
      .get<{ results: Movie[] }>
      (
        this.baseApiUrl + popularEndPoint,
        this.httpOptions
      )
      .pipe(map((response) => response.results));
  }

  fetchTopRated(pageNum: number): Observable<Movie[]>
  {
    let topRatedEndPoint = `/movie/top_rated?language=en-US&page=${pageNum}`;
    return this.httpClient
      .get<{ results: Movie[] }>
      (
        this.baseApiUrl + topRatedEndPoint,
        this.httpOptions
      )
      .pipe(map((response) => response.results));
  }

  fetchUpcoming(pageNum: number): Observable<Movie[]>
  {
    let upcomingEndPoint = `/movie/upcoming?language=en-US&page=${pageNum}`;
    return this.httpClient
      .get<{ results: Movie[] }>
      (
        this.baseApiUrl + upcomingEndPoint,
        this.httpOptions
      )
      .pipe(map((response) => response.results));
  }

  fetchMovieDetails(movieId: number): Observable<MovieDetails>
  {
    let movieDetailsEndPoint = `/movie/${movieId}?language=en-US`;
    return this.httpClient.get<MovieDetails>
    (
      this.baseApiUrl + movieDetailsEndPoint,
      this.httpOptions
    );
  }

  searchByTitle(title: string): Observable<Movie[]>
  {
    let searchByTitleEndPoint = `/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
    return this.httpClient
      .get<{ results: Movie[] }>
      (
        this.baseApiUrl + searchByTitleEndPoint,
        this.httpOptions
      )
      .pipe(map((response) => response.results));
  }

  fetchMovieCast(movieId: number): Observable<Cast[]>
  {
    let castEndPoint = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    return this.httpClient.get<{ cast: Cast[] }>(castEndPoint, this.httpOptions)
      .pipe
      (
        map(response => response.cast.slice(0,8))
      );
  }
}
