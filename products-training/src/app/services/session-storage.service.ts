import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private readonly isLoggedKey = 'IsLogged';

  constructor() {}

  setIsLogged(isLogged: boolean): void {
    sessionStorage.setItem(this.isLoggedKey, JSON.stringify(isLogged));
  }

  getIsLogged(): boolean {
    const isLoggedString = sessionStorage.getItem(this.isLoggedKey);
    return isLoggedString ? JSON.parse(isLoggedString) : false;
  }

  clearIsLogged(): void {
    sessionStorage.removeItem(this.isLoggedKey);
  }
}
