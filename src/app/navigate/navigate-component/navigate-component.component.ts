import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigate-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigate-component.component.html'
})
export class NavigateComponentComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  jwtToken = sessionStorage.getItem('jwtToken') || '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Lắng nghe sự kiện storage
    this.syncToken();
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
    this.syncToken(); // cập nhật token
    this.router.navigate(['/login']);
  }
}
