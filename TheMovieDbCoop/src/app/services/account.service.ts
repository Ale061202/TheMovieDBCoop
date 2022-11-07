import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavouriteMovieDto } from '../models/dto/favourite-movie.dto';
import { CreateFavMoviesResponse } from '../models/interfaces/create-favourite.interface';
import { FavouriteMoviesResponse } from '../models/interfaces/favourite-movies.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}

  getFavouriteMovies(page: number): Observable<FavouriteMoviesResponse>{
    return this.http.get<FavouriteMoviesResponse>(`${environment.apiBaseUrl}/account/${localStorage.getItem('account_id')}/favorite/movies?api_key=${environment.apiKey}&session_id=${localStorage.getItem('session_id') }&page=${page}`)
  }

  markAsFavourite(favouriteDto: FavouriteMovieDto): Observable<CreateFavMoviesResponse>{
    return this.http.request<CreateFavMoviesResponse>('post',`${environment.apiBaseUrl}/account/${localStorage.getItem('account_id')}/favorite?api_key=${environment.apiKey}&session_id=${localStorage.getItem('session_id') }`)
  }
}
