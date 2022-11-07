import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieDetailsResponse } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId: number = 0;
  movie: Movie = {} as Movie;
  movieDetails: MovieDetailsResponse;
  movieImg = '';
  backImg = '';

  constructor(private movieService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  getMovieDetails(){
    this.route.params.subscribe(resp => {
      this.movieId = resp['id'];

      this.movieService.getMovieDetails(this.movieId).subscribe(resp => {
        this.movieDetails = resp;
        this.movieImg = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${resp.poster_path}`;
        this.backImg = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${resp.backdrop_path}`;
      });
    })
  }




}
