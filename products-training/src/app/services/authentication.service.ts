import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContentObserver } from '@angular/cdk/observers';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string = 'https://localhost:7242';
  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
  ) {}

  login(credentials: any): Observable<boolean> {
    return this.http.post(this.API_URL + '/User', credentials).pipe(
      map((response: any) => {
        this.storage.setIsLogged(response);
        return response;
      }),
      catchError((error: any) => {
        console.log(error);
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
