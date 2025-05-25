import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() {
    this.checkToken();
  }

  isAuthorized = false

  authenticated = signal(false)

  logIn(token: string) {
    localStorage.setItem('token', token);
    this.isAuthorized = true;
    this.authenticated.set(true);
  }

  logOut() {
    localStorage.removeItem('token');
    this.isAuthorized = false;
    this.authenticated.set(false);
  }

  isLoggedIn() {
    return this.authenticated()
  }

  checkToken(){
    if(localStorage.getItem('token')){
      this.isAuthorized = true
    }
    else{
      this.isAuthorized = false
    }
  }  

}
