import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { loginToken, user, loggedInUser } from '../../types/user.type';

@Injectable()
export class UserService {

  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private loggedInUserInfo: BehaviorSubject<loggedInUser> = new BehaviorSubject(<loggedInUser>{});

  private autoLogoutTimer: any;
  private authToken: string;

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  createUser(user: user): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup';
    return this.http.post(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.http.post(url, { email: email, password: password });
  }

  activateToken(token: loginToken): void {
    // console.log('Token:', token.token);
    // console.log('Expires In Seconds:', token.expiresInSeconds);
    // token.expiresInSeconds=10;  For Testing Purpose
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString())
    localStorage.setItem('firstName', token.user.firstName);
    localStorage.setItem('lastName', token.user.lastName);
    localStorage.setItem('address', token.user.address);
    localStorage.setItem('city', token.user.city);
    localStorage.setItem('state', token.user.state);
    localStorage.setItem('pin', token.user.pin);
    localStorage.setItem('email', token.user.email);

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
    this.setAutoLogoutTimer(token.expiresInSeconds * 1000);
    this.authToken = token.token;
  }

  get isUserauthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserauthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get loggedInUser$(): Observable<loggedInUser> {
    return this.loggedInUserInfo.asObservable();
  }

  get loggedInUser():loggedInUser{
    return this.loggedInUserInfo.value;
  }

  get token(): string {
    return this.authToken;
  }  

  logout(): void {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next(<loggedInUser>{});
    clearTimeout(this.autoLogoutTimer);
  }

  loadToken(): void {
    const token: string | null = localStorage.getItem('token');
    const expiry: string | null = localStorage.getItem('expiry');
    if (!token || !expiry) {
      return;
    } else {
      const expiresIn: number = new Date(expiry).getTime() - new Date().getTime();
      if (expiresIn > 0) {
        const firstName: string | null = localStorage.getItem('firstName');
        const lastName: string | null = localStorage.getItem('lastName');
        const address: string | null = localStorage.getItem('address');
        const city: string | null = localStorage.getItem('city');
        const state: string | null = localStorage.getItem('state');
        const pin: string | null = localStorage.getItem('pin');
        const email: string | null = localStorage.getItem('email');

        const user: loggedInUser = {
          firstName: firstName != null ? firstName : '',
          lastName: lastName != null ? lastName : '',
          address: address != null ? address : '',
          city: city != null ? city : '',
          state: state != null ? state : '',
          pin: pin != null ? pin : '',
          email: email != null ? email : ''
        }
        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(user);
        this.setAutoLogoutTimer(expiresIn);
        this.authToken = token;
      } else {
        this.logout();
      }
    }
  }

  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration)
  }
}
