import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigate-component',
  imports: [CommonModule],
  templateUrl: './navigate-component.component.html'
})
export class NavigateComponentComponent {
  isMobileMenuOpen = false;
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
