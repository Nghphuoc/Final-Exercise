import { Component, OnInit } from '@angular/core';
import { ShareModule } from '../../share/share.module';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../userService/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [EditUserComponent, ShareModule],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  user: any = null;
  isLoading: boolean = true;
  openEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.userService.getUserByName(username).subscribe({
          next: (res: any) => {
            this.user = res;
            this.isLoading = false;
          },
          error: (err: any) => {
            console.error('Error fetching user details:', err);
            this.isLoading = false;
            // You might want to add error handling here
          }
        });
      } else {
        this.isLoading = false;
        // Handle case when no username is provided
        this.router.navigate(['/home']);
      }
    });
  }

  onOpenEdit() {
    this.openEdit = true;
  }

  onCloseEdit(check: boolean) {
    this.openEdit = check;
    this.getUser();
  }
}
