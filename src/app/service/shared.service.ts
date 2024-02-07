import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Genre } from '../models/genre.model';
import { Router } from '@angular/router';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService
{
  private currentMoviesSubject = new BehaviorSubject<Movie[]>([]);
  currentMovies = this.currentMoviesSubject.asObservable();

  searchResults !: Observable<Movie[]>;
  currentCategory: string = '';
  validGenreNames: string[] = [];
  favorites: Movie[] = [];
  validGenres !: Observable<Genre[]>;

  constructor(private router: Router, private apiFetchService: ApiFetchService, private local: LocalStorageService)
  {
    this.fetchAndSetGenres();
  }

  private fetchAndSetGenres(): void
  {
    this.validGenres = this.apiFetchService.fetchGenres();
    this.validGenres.pipe(map((genres) => genres.map((genre) => genre.name)))
      .subscribe((names) => {this.validGenreNames = names;});
  }

  showCategory(category: string, pageNum: number = 1): void
  {
    this.router.navigate(['/category', category, 'page', pageNum]);
    this.currentCategory = category;

    switch (category)
    {
      case 'popular':
        this.searchResults = this.apiFetchService.fetchPopular(pageNum);
        this.searchResults.subscribe((movies) => {this.setMovies(movies);});
        break;

      case 'nowPlaying':
        this.searchResults = this.apiFetchService.fetchNowPlaying(pageNum);
        this.searchResults.subscribe((movies) => {this.setMovies(movies);});
        break;

      case 'topRated':
        this.searchResults = this.apiFetchService.fetchTopRated(pageNum);
        this.searchResults.subscribe((movies) => {this.setMovies(movies);});
        break;

      case 'upcoming':
        this.searchResults = this.apiFetchService.fetchUpcoming(pageNum);
        this.searchResults.subscribe((movies) => {this.setMovies(movies);});
        break;

      case 'favorite':
        this.favorites = this.local.get('favorites') || [];
        this.setMovies(this.favorites);
        break;
    }
  }

  getGenreByName(genreName: string): Observable<Genre | undefined>
  {
    return this.validGenres.pipe
    (
      map((genres) =>
      {
        const genre = genres.find((g) => g.name === genreName);
        return genre;
      })
    );
  }

  setMovieByGenre(genre: Genre, pageNum: number)
  {
    this.router.navigate(['/category', genre.name, 'page', pageNum]);
    this.currentCategory = genre.name;
    this.searchResults = this.apiFetchService.fetchMoviesByGenre(genre.id, pageNum);
    this.searchResults.subscribe((movies) => {this.setMovies(movies);});
  }

  setMovies(movies: Movie[])
  {
    this.currentMoviesSubject.next(movies);
  }

  setCategorayPage(currentCategory: string, pageNum: number)
  { 
    if (this.validGenreNames.includes(currentCategory))
    {
      this.getGenreByName(currentCategory).subscribe((genre) =>
      {
        if (genre)
        {
          this.setMovieByGenre(genre, pageNum);
        }
        
        else
        {
          console.log('Genre not found');
        }
      });
    }
  }

  private localStorageKey = 'favoriteFilms';

  getFavoriteFilms(): Movie[]
  {
    const favoriteFilmsJSON = localStorage.getItem(this.localStorageKey);
    return favoriteFilmsJSON ? JSON.parse(favoriteFilmsJSON) : [];
  }

  setFavoriteFilms(favoriteFilms: Movie[]): void
  {
    localStorage.setItem(this.localStorageKey, JSON.stringify(favoriteFilms));
  }
}