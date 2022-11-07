import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, MovieDetailsResponse, Movies, MovieVideoResponse } from '../models/interfaces/movies.interface';

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
}
