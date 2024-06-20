import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api/auth`;
  private apiUrl = 'http://localhost:8080/api';
  private jwtHelper = new JwtHelperService();
  private tokenKey = 'auth-token';
  private userKey = 'user-data';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        this.setSession(response.token);
        this.getUserByEmail(credentials.email).subscribe(user => {
          sessionStorage.setItem('user-details', JSON.stringify(user));
        });
      })
    );
  }
  

  private setSession(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    const decodedToken = this.jwtHelper.decodeToken(token);
    sessionStorage.setItem(this.userKey, JSON.stringify(decodedToken));
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getUserData(): any {
    const userData = sessionStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/email/${email}`);
  }
}

