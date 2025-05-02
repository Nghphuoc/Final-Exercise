import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { UserService } from '../user-component/userService/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [CommonModule, ShareModule, RouterModule],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

    jwtToken = sessionStorage.getItem("jwtToken")
    username: string = 'User';
    lastLogin: Date = new Date();
    totalUsers: number = 0;
    activeSessions: number = 0;
    recentActivities: any[] = [
        {
            icon: 'person_add',
            title: 'New User Registration',
            description: 'A new user has joined the platform',
            time: '2 minutes ago'
        },
        {
            icon: 'edit',
            title: 'Profile Update',
            description: 'User profile information was updated',
            time: '1 hour ago'
        },
        {
            icon: 'security',
            title: 'Security Alert',
            description: 'System security check completed',
            time: '3 hours ago'
        }
    ];

    constructor(private userService: UserService, private router : Router) { }

    ngOnInit() {
        // Get username from session storage with default value
        const storedUsername = sessionStorage.getItem('username');
        this.username = storedUsername || 'User';

        // Get total users count
        this.userService.getAllUsers().subscribe({
            next: (users: any[]) => {
                this.totalUsers = users.length;
            },
            error: (err) => {
                console.error('Error fetching users:', err);
            }
        });

        // Simulate active sessions (in a real app, this would come from your backend)
        this.activeSessions = Math.floor(Math.random() * 50) + 10;
    }

    syncToken = () => {
        this.jwtToken = sessionStorage.getItem('jwtToken') || '';
      };
    
      logout() {
        sessionStorage.removeItem('jwtToken');
        this.jwtToken = '';
        this.syncToken(); // cập nhật token
        this.router.navigate(['/login']);
      }
} 