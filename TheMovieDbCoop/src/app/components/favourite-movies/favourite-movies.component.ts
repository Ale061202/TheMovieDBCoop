import { Component, Input, OnInit } from '@angular/core';
import { FavouriteMovieDto } from 'src/app/models/dto/favourite-movie.dto';
import { Favourites } from 'src/app/models/interfaces/favourite-movies.interfaces';
import { Movie } from 'src/app/models/interfaces/movies.interface';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.css']
})
export class FavouriteMoviesComponent implements OnInit {

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  favMovie: Favourites = {} as Favourites;
  favMovies: Favourites[] = [];
  isFav = false;
  page = 1;
  session_id = false;
  sessionId = localStorage.getItem('session_id');


  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getPage(this.page);
    if(localStorage.getItem('session_id') !== null) {
      this.session_id = true;
      this.accountService.getFavouriteMovies(this.sessionId, this.page).subscribe(resp => {
        this.favMovies = resp.results;
      })
    }
  }

  deleteFav(){
    let favMovie = new FavouriteMovieDto();
    favMovie.favorite = false;
    favMovie.media_id = this.favMovie.id;
    favMovie.media_type = 'movie';
    this.accountService.markAsFavourite(favMovie).subscribe((resp) =>{
      if(resp.success){
        location.reload();
        alert('Pelicula eliminada de favoritos.');
      }
    })
  }

  getPage(pages: number){
    if(pages > 0){
      this.accountService.getFavouriteMovies(this.sessionId ,pages).subscribe(resp => {
        this.favMovies = resp.results;
      })
      this.page = pages
    }
  }

  getPhotoUrl(movie: Favourites){
    return `${environment.posterPath}/w500/${movie.poster_path}`
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
