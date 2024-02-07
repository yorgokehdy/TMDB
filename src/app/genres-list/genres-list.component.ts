import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { Genre } from '../models/genre.model';
import { Observable, map } from 'rxjs';
import { SharedService } from '../service/shared.service';


@Component({
  selector: 'app-genres-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genres-list.component.html',
  styleUrl: './genres-list.component.css',
})
export class GenresListComponent {
  genres!: Observable<Genre[]>;
  currentGenre: string = '';

  constructor(
    private apiFetchService: ApiFetchService,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.genres = this.apiFetchService.fetchGenres();
  }

  getValidGenres(): Observable<Genre[]> {
    return this.genres.pipe(map((genres) => genres.map((genre) => genre)));
  }

  fetchMoviesByGenre(genre: Genre, pageNum: number = 1): void {
    this.currentGenre = genre.name;
    this.sharedService.setMovieByGenre(genre, pageNum);
  }
}
