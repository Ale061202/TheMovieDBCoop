import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, MovieDetailsResponse, Movies } from '../interfaces/movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMoviesPage(page: number): Observable<Movies>{
    return this.http.get<Movies>(`${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}&language=en-US&page=${page}`);
  }

  getMovieDetails(movie: Movie): Observable<MovieDetailsResponse>{
    return this.http.get<MovieDetailsResponse>(
      `${environment.apiBaseUrl}/movie/${movie.id}/videos?api_key=${environment.apiKey}&language=en-US`
      );
  }
}
