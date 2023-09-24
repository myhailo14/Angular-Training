import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { Credentials } from '../models/credentials.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string = 'https://localhost:7242';
  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
  ) {}

  login(credentials: Credentials): Observable<boolean> {
    return this.http
      .post<boolean>(this.API_URL + '/User', credentials)
      .pipe(
        map((response: boolean) => {
          this.storage.setIsLogged(response);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          this.storage.setIsLogged(false);
          return of(false);
        })
      );
  }

  logout(): void {
    this.storage.clearIsLogged();
  }

  isLoggedIn(): boolean {
    return this.storage.getIsLogged();
  }
}
