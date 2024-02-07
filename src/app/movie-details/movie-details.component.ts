import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiFetchService } from '../api-fetch/api-fetch.service'; // Adjust the path as necessary
import { MovieDetails } from '../models/movieDetails.model';
import { Cast } from '../models/cast.model';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movieDetails!: MovieDetails;
  movieCast!:Cast[];

  constructor(
    private apiFetchService: ApiFetchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    const movieId = +this.route.snapshot.paramMap.get('id')!;
    this.apiFetchService.fetchMovieDetails(movieId).subscribe(data => {
      this.movieDetails = data;
    });
    this.apiFetchService.fetchMovieCast(movieId).subscribe(data => {
      this.movieCast = data;
    });

  }
}

