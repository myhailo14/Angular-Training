import { of } from "rxjs";

export const mockAuthService = {
  login: jasmine.createSpy('login'),
  logout: jasmine.createSpy('logout'),
  isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(true)
};