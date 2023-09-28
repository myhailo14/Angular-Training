import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './authentication.service';
import { SessionStorageService } from './session-storage.service';
import { HtmlParser } from '@angular/compiler';
import { Credentials } from '../models/credentials.model';

describe('AuthenticationService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storage: jasmine.SpyObj<SessionStorageService>;
  const storageSpy = jasmine.createSpyObj('SessionStorageService', ['setIsLogged', 'getIsLogged', 'clearIsLogged']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: SessionStorageService, useValue: storageSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    storage = TestBed.inject(SessionStorageService) as jasmine.SpyObj<SessionStorageService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true on success login', () => {
    const mockCredentials: Credentials = new Credentials(
      'test@mail.com',
      'Qwerty1'
    );
    const mockResponse = true;
    service.login(mockCredentials).subscribe((response) => {
      expect(response).toBeTrue();
    });

    const req = httpMock.expectOne(service['API_URL'] + '/User');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return false on failed login', () => {
    const mockCredentials: Credentials = { email: 'test', password: 'password' };
    const mockResponse = false;

    service.login(mockCredentials).subscribe(response => {
      expect(response).toBeFalse();
    });
  
    const req = httpMock.expectOne(service['API_URL'] + '/User');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should clear the logged-in state on logout', () => {
    service.logout();
    expect(storage.clearIsLogged).toHaveBeenCalled();
  });
  
  it('should return the logged-in state', () => {
    storage.getIsLogged.and.returnValue(true);  // Mock the return value of getIsLogged

    const isLoggedIn = service.isLoggedIn();

    expect(isLoggedIn).toBeTrue();
    expect(storage.getIsLogged).toHaveBeenCalled();
  });

});
