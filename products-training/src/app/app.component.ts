import { Component } from '@angular/core';
import { SessionStorageService } from './services/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library';

  constructor(){
    // remove later
    // sessionStorage.setItem('IsLogged', JSON.stringify(true));
  }
}
