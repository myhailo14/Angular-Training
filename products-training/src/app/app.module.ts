import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Material Design Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

// Custom Components and Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

import { SharedModule } from './shared/shared.module';
import { BookModule } from './book/book.module';
import { BookListComponent } from './book/book-list/book-list.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { RentTermDialogComponent } from './rent-term-dialog/rent-term-dialog.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { StoreModule } from '@ngrx/store';
import { appStoreProviders } from './stores/app.store';
import { MatCarouselModule } from 'ng-mat-carousel';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomePageComponent, PaymentPageComponent, RentTermDialogComponent, ResultPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    BookModule
  ],
  providers: [appStoreProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
