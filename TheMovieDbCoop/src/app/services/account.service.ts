import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RatingDto } from '../models/dto/create-rating.dto';
import { FavouriteMovieDto } from '../models/dto/favourite-movie.dto';
import { AccountDetailResponse } from '../models/interfaces/account-detail.interface';
import { CreateFavMoviesResponse } from '../models/interfaces/create-favourite.interface';
import { FavouriteMoviesResponse } from '../models/interfaces/favourite-movies.interfaces';
import { FilmRatedResponse, RatedMoviesResponse } from '../models/interfaces/movies.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}

  getAccountId(sessionId: string): Observable<AccountDetailResponse>{

    return this.http.get<AccountDetailResponse>(`
      ${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${sessionId}
    `);
  }

  getFavouriteMovies(sessionId: string,page: number): Observable<FavouriteMoviesResponse>{
    return this.http.get<FavouriteMoviesResponse>(`${environment.apiBaseUrl}/account/0/favorite/movies?api_key=${environment.apiKey}&session_id=${sessionId}&page=${page}`)

  }

  getRatedMovies(sessionId: string, page: number): Observable<RatedMoviesResponse>{
    return this.http.get<RatedMoviesResponse>(
      `${environment.apiBaseUrl}/account/0/rated/movies?session_id=${sessionId}&api_key=${environment.apiKey}&page=${page}`

    );
  }

  createRating(movieId: number, rating: RatingDto, sessionId: string): Observable<FilmRatedResponse>{
    return this.http.post<FilmRatedResponse>(`${environment.apiBaseUrl}/movie/${movieId}/rating?api_key=${environment.apiKey}&session_id=${sessionId}`, rating);
  }

  markAsFavourite(favouriteDto: FavouriteMovieDto): Observable<CreateFavMoviesResponse>{
    return this.http.request<CreateFavMoviesResponse>('post',`${environment.apiBaseUrl}/account/${localStorage.getItem('account_id')}/favorite?api_key=${environment.apiKey}&session_id=${localStorage.getItem('session_id') }`)
  }
}
