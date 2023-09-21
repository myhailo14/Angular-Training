import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logOut(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
