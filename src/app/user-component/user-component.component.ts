import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { ShareModule } from '../share/share.module';
@Component({
  selector: 'app-user-component',
  imports: [ ShareModule],
  templateUrl: './user-component.component.html',
})
export class UserComponentComponent implements OnInit {
  dataUser: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

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
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách user:', err);
      }
    });
  }

  onChangeSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase().trim();
    this.filterUsers();
  }

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

  onClickDetailUser(username: string) {
    console.log("name: ", username);
    this.router.navigate([`userDetail/${username}`]);
  }
}
