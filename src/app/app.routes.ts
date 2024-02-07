import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

export const routes: Routes =
[
    { path: '', component: MoviesListComponent },
    { path: 'movie-details/:id', component: MovieDetailsComponent },
    { path: 'category/:currentCategory/page/:pageNum', component: MoviesListComponent }
];