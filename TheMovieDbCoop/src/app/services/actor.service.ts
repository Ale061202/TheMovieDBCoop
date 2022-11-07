import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorDetailResponse } from '../models/interfaces/actor-detail.interface';
import { ActorListResponse } from '../models/interfaces/actor-list.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) {}

  getActors(page: number): Observable<ActorListResponse>{
    return this.http.get<ActorListResponse>(`${environment.apiBaseUrl}/person/popular?api_key=${environment.apiKey}&page=${page}`)
  }

  getActorDetail(actorId: number): Observable<ActorDetailResponse>{
    return this.http.get<ActorDetailResponse>(`${environment.apiBaseUrl}/person/${actorId}?api_key=${environment.apiKey}`)
  }
}
