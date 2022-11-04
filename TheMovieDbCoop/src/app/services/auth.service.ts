import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RequestTokenResponse } from '../interfaces/request-token.interface';
import { environment } from 'src/environments/environment';
import { CreateSessionDto } from '../models/dto/create-session.dto';
import { CreateSessionResponse } from '../interfaces/create-session.interface';
import { DeleteSessionDto } from '../models/dto/delete-session.dto';
import { DeleteSessionResponse } from '../interfaces/delete-session.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  createRequestToken(): Observable<RequestTokenResponse> {
    return this.http.get<RequestTokenResponse>(`${environment.apiBaseUrl}/authentication/token/new?api_key=${environment.apiKey}`);
  }

  createSession(request_token: CreateSessionDto): Observable<CreateSessionResponse>{
    return this.http.post<CreateSessionResponse>(`${environment.apiBaseUrl}/authentication/session/new?api_key=${environment.apiKey}&request_token=`,request_token);
  }

  deleteSession(deleteSessionDto: DeleteSessionDto): Observable<DeleteSessionResponse>{
    return this.http.delete<DeleteSessionResponse>(`${environment.apiBaseUrl}/authentication/session?api_key=${environment.apiKey}`,{body: deleteSessionDto});
  }
}
