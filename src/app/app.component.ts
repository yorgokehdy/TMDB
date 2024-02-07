import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GenresListComponent } from './genres-list/genres-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GenresListComponent, MovieDetailsComponent, MoviesListComponent, SearchMovieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent
{
  title = 'TMDB';
  router: any;
}