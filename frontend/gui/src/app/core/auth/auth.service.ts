import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/user.model'; // Ajusta la ruta según tu estructura
import { RespuestaAutenticacion } from '../models/user.model'; // Ajusta la ruta según tu estructura

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth'; // Proxy Flask

  constructor(private http: HttpClient,private router: Router) {}

  register(userData: Usuario): Observable<RespuestaAutenticacion> {
    return this.http.post<RespuestaAutenticacion>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: Usuario): Observable<RespuestaAutenticacion> {
    return this.http.post<RespuestaAutenticacion>(`${this.apiUrl}/login`, credentials);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/auth/login']);
    console.log('Se cerró sesión correctamente');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
