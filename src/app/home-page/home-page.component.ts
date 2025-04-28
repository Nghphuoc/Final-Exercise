import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  recentActivities = [
    { title: 'New Employee Onboarding', time: '2 hours ago', status: 'completed' },
    { title: 'Team Meeting', time: '1 day ago', status: 'scheduled' },
    { title: 'Project Review', time: '2 days ago', status: 'pending' }
  ];

  quickStats = [
    { title: 'Total Employees', value: '150', icon: '👥' },
    { title: 'Active Projects', value: '12', icon: '📊' },
    { title: 'Pending Tasks', value: '8', icon: '📝' },
    { title: 'Team Performance', value: '92%', icon: '📈' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
