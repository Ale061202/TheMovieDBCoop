import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RatingDto } from '../models/dto/create-rating.dto';
import { AccountDetailResponse } from '../models/interfaces/account-detail.interface';
import { FilmRatedResponse, Movie, MovieDetailsResponse, Movies, MovieVideoResponse, RatedMoviesResponse } from '../models/interfaces/movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMoviesPage(page: number): Observable<Movies>{
    return this.http.get<Movies>(`${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}&language=en-US&page=${page}`);
  }

  getMovieDetails(movieId: number): Observable<MovieDetailsResponse>{
    return this.http.get<MovieDetailsResponse>(
      `${environment.apiBaseUrl}/movie/${movieId}?api_key=${environment.apiKey}&language=en-US`
      );
  }

  getMovieVideo(movieId: number): Observable<MovieVideoResponse>{
    return this.http.get<MovieVideoResponse>(
      `${environment.apiBaseUrl}/movie/${movieId}/videos?api_key=${environment.apiKey}&language=en-US`
    );
  }

  getRatedMovies(sessionId: string, page: number): Observable<RatedMoviesResponse>{
    return this.http.get<RatedMoviesResponse>(
      `${environment.apiBaseUrl}/account/0/rated/movies?session_id=${sessionId}&api_key=${environment.apiKey}&page=${page}`

    );
  }

  createRating(movieId: number, rating: RatingDto, sessionId: string): Observable<FilmRatedResponse>{
    return this.http.post<FilmRatedResponse>(`${environment.apiBaseUrl}/movie/${movieId}/rating?api_key=${environment.apiKey}&session_id=${sessionId}`, rating);
  }

  getAccountId(sessionId: string): Observable<AccountDetailResponse>{

    return this.http.get<AccountDetailResponse>(`
      ${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${sessionId}
    `);
  }
}
