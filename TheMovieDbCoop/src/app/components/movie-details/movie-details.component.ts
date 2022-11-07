import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsResponse, MovieVideo, MovieVideoResponse } from 'src/app/models/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId: number = 0;
  movieDetails: MovieDetailsResponse;
  movieVideos: MovieVideoResponse;
  movieImg = '';
  backImg = '';
  videos: MovieVideo [] = [];

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

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

        this.movieService.getMovieVideo(this.movieId).subscribe(resp => {
          this.movieVideos = resp;
          this.videos = resp.results;
        });
      });
    });
  }



  getVideoUrl(video: MovieVideo){

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.key}`);
  }

}
