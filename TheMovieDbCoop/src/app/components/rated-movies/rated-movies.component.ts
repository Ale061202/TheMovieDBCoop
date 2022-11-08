import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/interfaces/movies.interface';
import { AccountService } from 'src/app/services/account.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.css']
})
export class RatedMoviesComponent implements OnInit {

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  page: number = 1;
  accountId: number;
  sessionId: string = localStorage.getItem('session_id');
  movies: Movie[]=[];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.getRatedMovies(this.page);
  }

  getRatedMovies(page: number){
    this.accountService.getAccountId(this.sessionId).subscribe(resp => {
      this.accountId = resp.id;

      this.accountService.getRatedMovies(this.sessionId, page).subscribe(resp => {
        this.movies = resp.results;
      });
    });
  }

  getMovieImg(movie: Movie): string{
    return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`;
  }

  getPage(page: number) {
    if(page > 0){
      this.getRatedMovies(page)
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

}
