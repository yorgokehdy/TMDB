import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { SharedService } from '../service/shared.service';
import { Genre } from '../models/genre.model';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [MoviesListComponent, CommonModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css',
})
export class SearchMovieComponent {
  searchResults!: Observable<Movie[]>;
  currentSearch: string = '';
  currentCategory: string = '';

  constructor(
    private apiFetchService: ApiFetchService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.showCategory('popular');
  }

  performSearch(query: string): void {
    this.router.navigate(['/category', 'search', 'page', 1]);
    if (query) {
      this.currentSearch = query;

      this.searchResults = this.apiFetchService.searchByTitle(query);

      this.searchResults.subscribe((movies) => {
        this.sharedService.setMovies(movies);
      });
    }
  }

  setMovieByGenre(genre: Genre, pageNum: number) {
    this.router.navigate(['/category', genre.name, 'page', pageNum]);
    this.currentCategory = genre.name;

    this.searchResults = this.apiFetchService.fetchMoviesByGenre(genre.id, pageNum);
    this.searchResults.subscribe((movies) => {
      this.sharedService.setMovies(movies);
    });
  }

  showCategory(category: string, pageNum: number = 1): void {
    this.sharedService.showCategory(category, pageNum);
  }
}
