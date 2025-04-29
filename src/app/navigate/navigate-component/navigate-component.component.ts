import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigate-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigate-component.component.html'
})
export class NavigateComponentComponent implements OnInit, OnDestroy, DoCheck {

  isMobileMenuOpen = false;
  jwtToken = sessionStorage.getItem('jwtToken') || '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.syncToken();
    window.addEventListener('storage', this.syncToken); // Cập nhật khi có thay đổi từ tab khác
  }

  ngDoCheck(): void {
    // Kiểm tra liên tục khi có thay đổi trong ứng dụng
    const currentToken = sessionStorage.getItem('jwtToken') || '';
    if (this.jwtToken !== currentToken) {
      this.jwtToken = currentToken;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.syncToken);
  }

  syncToken = () => {
    this.jwtToken = sessionStorage.getItem('jwtToken') || '';
  };

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    sessionStorage.removeItem('jwtToken');
    this.jwtToken = '';
    this.syncToken(); // cập nhật token
    this.router.navigate(['/login']);
  }
}
