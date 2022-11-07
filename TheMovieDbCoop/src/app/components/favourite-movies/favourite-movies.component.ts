import { Component, OnInit } from '@angular/core';
import { FavouriteMovieDto } from 'src/app/models/dto/favourite-movie.dto';
import { Favourites } from 'src/app/models/interfaces/favourite-movies.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.css']
})
export class FavouriteMoviesComponent implements OnInit {

  favMovie: Favourites = {} as Favourites;
  favMovies: Favourites[] = [];
  isFav = false;
  page = 1;
  session_id = false;
  

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getPage(this.page);
    if(localStorage.getItem('session_id') !== null) {
      this.session_id = true;
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
      this.accountService.getFavouriteMovies(pages).subscribe(resp => {
        this.favMovies = resp.results;
      })
      this.page = pages
    }
  }

  getPhotoUrl(){
    return `${environment.posterPath}/w500/${this.favMovie.poster_path}`
  }

}
