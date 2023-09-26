import { Component, Inject, Input } from '@angular/core';
import { Store } from 'redux';
import { AppState } from '../stores/app.state';
import { AppStore } from '../stores/app.store';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent {
  currentChange: number | null;

  constructor(@Inject(AppStore) private store: Store<AppState>){
    this.currentChange = this.store.getState().currentChange;
  }
  
  
}
