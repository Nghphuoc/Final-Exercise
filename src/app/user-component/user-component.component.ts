import { Component, OnInit } from '@angular/core';
import { UserService } from './userService/user.service';
import { Router } from '@angular/router';
import { ShareModule } from '../share/share.module';

@Component({
  selector: 'app-user-component',
  imports: [ShareModule],
  templateUrl: './user-component.component.html',
})
export class UserComponentComponent implements OnInit {
  dataUser: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  Math = Math; // Add Math property to use in template

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getAllUsers().subscribe({
      next: (res: any[]) => {
        console.log('Lấy danh sách user thành công:', res);
        this.dataUser = res;
        this.filteredUsers = res; // Initialize filtered users with all users
        this.updatePagination();
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách user:', err);
      }
    });
  }

  // Search users 
  onChangeSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase().trim();
    this.filterUsers();
    this.currentPage = 1; // Reset to first page when searching
    this.updatePagination();
  }

  // Filter users
  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.dataUser;
      return;
    }

    this.filteredUsers = this.dataUser.filter(user => {
      return (
        (user.username?.toLowerCase().includes(this.searchTerm)) ||
        (user.email?.toLowerCase().includes(this.searchTerm)) ||
        (user.lastname?.toLowerCase().includes(this.searchTerm))
      );
    });
  }

  // Detail user
  onClickDetailUser(username: string) {
    console.log("name: ", username);
    this.router.navigate([`userDetail/${username}`]);
  }

  // Pagination methods
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  // Get current page users
  getCurrentPageUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
