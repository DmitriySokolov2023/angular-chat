import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}
  getUserName() {
    return localStorage.getItem('username') || 'guest';
  }
  login(username: string) {
    localStorage.setItem('username', username);
  }
  logout() {
    const userName = localStorage.getItem('username');
    if (userName) {
      this.router.navigate(['/']);
      localStorage.removeItem('username');
    }
  }
}
