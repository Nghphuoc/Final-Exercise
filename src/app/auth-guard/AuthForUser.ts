import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthForUser implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!sessionStorage.getItem('jwtToken');
    const roles = sessionStorage.getItem('roles');
    if (isLoggedIn ) {
      if(roles === 'ROLE_USER'){
        return true;
      }else{
        this.router.navigate(['/access-denied']);
        return false;
      }
    } else {
      this.router.navigate(['/login']); // chuyển hướng nếu chưa đăng nhập
      return false;
    }
  }
}
