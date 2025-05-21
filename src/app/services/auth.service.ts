import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized = false;
  authenticated = signal(false);

  constructor() {
    this.checkToken();
  }

  logIn() {
    this.isAuthorized = true;
    this.authenticated.set(true);
  }

  logOut() {
    localStorage.removeItem('token'); 
    this.isAuthorized = false;
    this.authenticated.set(false);
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      this.isAuthorized = true;
      this.authenticated.set(true);
    } else {
      this.isAuthorized = false;
      this.authenticated.set(false);
    }
  }

}
