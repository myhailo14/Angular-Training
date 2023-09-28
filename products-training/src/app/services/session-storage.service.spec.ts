import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService]
    });

    service = TestBed.inject(SessionStorageService);
    sessionStorage.clear();  // Clear sessionStorage before each test
  });

  it('should set the logged-in state in sessionStorage', () => {
    service.setIsLogged(true);
    const isLogged = JSON.parse(sessionStorage.getItem(service['isLoggedKey'])!);
    expect(isLogged).toBeTrue();
  });
  
  it('should retrieve the logged-in state from sessionStorage', () => {
    sessionStorage.setItem(service['isLoggedKey'], JSON.stringify(true));
    const isLoggedIn = service.getIsLogged();
    expect(isLoggedIn).toBeTrue();
  });
  
  it('should return false if the logged-in state is not set in sessionStorage', () => {
    const isLoggedIn = service.getIsLogged();
    expect(isLoggedIn).toBeFalse();
  });
  
  it('should clear the logged-in state from sessionStorage', () => {
    sessionStorage.setItem(service['isLoggedKey'], JSON.stringify(true));
    service.clearIsLogged();
    const isLogged = sessionStorage.getItem(service['isLoggedKey']);
    expect(isLogged).toBeNull();
  });
});