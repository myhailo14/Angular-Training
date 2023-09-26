import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

const API_URL = 'https://localhost:7242';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  getApiUrl(): string {
    return API_URL;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
