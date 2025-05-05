import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-access-denied',
    templateUrl: './access-denied.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class AccessDeniedComponent {
    constructor(private router: Router, private location: Location){}

    onLogin(): void {
        sessionStorage.removeItem('jwtToken');
        this.router.navigate(['/login']);
    }

    goBack(): void {
        this.location.back(); 
    }
} 