import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

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

  getMovieImg(movie: Movie): string{
    return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`;
  }

  getPage(page: number) {
    if(page > 0){
      this.getAllMovies(page)
      this.page = page;
    }
  }

  getVotePercentage(note: number): number{

    return note*10;
  }

  getVoteColor(note: number): string{

    let color: string = '';
    if(note < 10 && note >= 9)
      color = 'green';

    else if(note >= 7 && note < 9)
      color = 'olive';

    else if(note >= 5 && note < 7)
      color = 'goldenrod';

    else if(note >= 3 && note < 5)
      color = 'red';

    else
      color = 'black';

    return color;
  }

  /* MÉTODO PARA COGER EL VIDEO DEL TRAILER

  getVideoUrl(movie: Movie, movieDetails: MovieDetails){
    if(movie.video)
      return `https://www.youtube.com/watch?v=${movieDetails.key}`;

    else
      return 'https://www.youtube.com/watch?v=GPXkjtpGCFI&ab_channel=KushMaster';
  }*/



}