import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient, private router: Router) {}

    register(user: any) {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(user: any) {
        return this.http.post(`${this.apiUrl}/login`, user);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isLoggedIn() {
        return !!this.getToken();
    }
}
