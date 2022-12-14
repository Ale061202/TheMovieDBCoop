import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RatingDto } from 'src/app/models/dto/create-rating.dto';
import { MovieDetailsResponse, MovieVideo, MovieVideoResponse } from 'src/app/models/interfaces/movies.interface';
import { AccountService } from 'src/app/services/account.service';
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
  rating: number = 0;

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private accountService: AccountService) { }

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

  rateMovie(rating: number){
    let ratingDto = new RatingDto();
    ratingDto.value = rating * 2;
    this.accountService.createRating(this.movieId, ratingDto, localStorage.getItem('session_id') ).subscribe((res) => {
      if(res.success) {
        alert('Movie rated sucessfully with a '+ ratingDto.value);
      }
    });
  }


  getVideoUrl(video: MovieVideo){

    if(video.id != null)
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.key}`);

    else
      return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/GPXkjtpGCFI');
  }

}
