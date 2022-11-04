import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorListResponse } from '../interfaces/actor-list.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) {}

  getActors(page: number): Observable<ActorListResponse>{
    return this.http.get<ActorListResponse>(`${environment.apiBaseUrl}/person/popular?api_key=${environment.apiKey}&page=${page}`)
   }
}
