import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { LoginComponent } from './login/login.component';
import { routes as childRoutes, BookRoutingModule } from './book/book-routing.module';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent, canActivate: [loggedInGuard], children: childRoutes },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
