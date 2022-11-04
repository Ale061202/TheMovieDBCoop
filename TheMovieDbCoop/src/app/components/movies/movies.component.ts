import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  totalPages: number = 0;
  page: number = 1;
  movies: Movie[]=[];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getAllMovies(this.page);
  }

  getAllMovies(page: number){

    this.moviesService.getMoviesPage(page).subscribe(resp => {
      this.movies = resp.results
      this.totalPages = resp.total_pages;
    });
  }

  /* MÉTODO PARA COGER EL VIDEO DEL TRAILER

  getVideoUrl(movie: Movie, movieDetails: MovieDetails){
    if(movie.video)
      return `https://www.youtube.com/watch?v=${movieDetails.key}`;

    else
      return 'https://www.youtube.com/watch?v=GPXkjtpGCFI&ab_channel=KushMaster';
  }*/



}
