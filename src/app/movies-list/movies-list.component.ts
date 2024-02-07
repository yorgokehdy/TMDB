import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { LocalStorageService } from '../service/local-storage.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
})
export class MoviesListComponent {
  $movies!: Observable<Movie[]>;
  favorites: Movie[] = [];
  currentCategory!:string;
  currentPage: number = 1;

  toggleFavorite(movie: Movie) {
    const isAlreadyFavorite = this.isFavorite(movie);
    if (isAlreadyFavorite) {
      this.favorites = this.favorites.filter(
        (favorite) => favorite.id !== movie.id
      );
    } else {
      this.favorites.push(movie);
    }
    this.local.set('favorites', this.favorites);
  }

  isFavorite(movie: Movie): boolean {
    return this.favorites.some((favorite) => favorite.id === movie.id);
  }

  constructor(
    private movieService: SharedService,
    private local: LocalStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.$movies = this.movieService.currentMovies;
    this.favorites = this.local.get('favorites') || [];

    const paramMapObservable = this.route.paramMap.pipe(
      map(params => ({
        currentCategory: params.get('currentCategory') || '',
        currentPage: parseInt(params.get('pageNum') || '1', 10)
      }))
    );
  
    paramMapObservable.subscribe(({ currentCategory, currentPage }) => {
      this.currentCategory = currentCategory;
      this.currentPage = currentPage;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.updatePage();
  }
  
  previousPage(): void {
    this.currentPage = Math.max(1, this.currentPage - 1);
    this.updatePage();
  }
  
  private updatePage(): void {
    let currentCategory = this.route.snapshot.paramMap.get('currentCategory') || '';
    this.movieService.setCategorayPage(currentCategory, this.currentPage);
    this.scrollToTop();
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
