import { Component } from '@angular/core';
import { SessionStorageService } from './services/session-storage.service';
import { AuthService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'library';
  isLoggedIn: boolean;
  
  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
  }
}
