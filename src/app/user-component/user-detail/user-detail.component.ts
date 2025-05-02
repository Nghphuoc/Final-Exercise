import { Component, OnInit } from '@angular/core';
import { ShareModule } from '../../share/share.module';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../userService/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [EditUserComponent, ShareModule, ToastModule],
  templateUrl: './user-detail.component.html',
  providers: [MessageService]
})
export class UserDetailComponent implements OnInit {
  user: any = null;
  isLoading: boolean = true;
  openEdit: boolean = false;
  username : string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
       this.username = params['username'];
      if (this.username) {
        this.userService.getUserByName(this.username).subscribe({
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
        this.router.navigate(['/home']);
      }
    });
  }

  deleteUserByuserName(){
    console.log(this.username);
    this.userService.deleteUser(this.username).subscribe({
      next: (res: HttpResponse<any>) =>{
        if(res.status === 202){
          console.log(res);
          console.log(this.username);
          this.successDelete();
          this.router.navigate(['/home']);
        }
      },
      error: (err: HttpErrorResponse) => {
        const error = err.error.error;
        const message = err.error.message;
        this.failDelete(message, error);
        console.error('Error deleting user:', err);
      }
    })
  }

  successDelete() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete success', life: 3000 });
  }

  failDelete(message : string, error : string) {
    this.messageService.add({ severity: 'error', summary: message , detail: error, life: 3000 });
  }

  onOpenEdit() {
    this.openEdit = true;
  }

  onCloseEdit(check: boolean) {
    this.openEdit = check;
    this.getUser();
  }

  showToast(show : boolean){
    if(show){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update success', life: 3000 });
      show = false;
    }
  }

}
