import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!sessionStorage.getItem('jwtToken');
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']); // chuyển hướng nếu chưa đăng nhập
      return false;
    }
  }
}
