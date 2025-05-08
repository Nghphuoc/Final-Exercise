import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../../share/share.module';
import { UserService } from '../userService/user.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, ShareModule, ToastModule],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {

  username: string = '';

  @Input({ required: true }) user: any;
  @Input({ required: true }) openEdit: boolean = false;
  @Output() closeEdit = new EventEmitter<boolean>();
  @Output() showToast = new EventEmitter<boolean>();
  
  constructor(private userService: UserService, private route: ActivatedRoute, private messageService : MessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.username = username;
    });
  }

  onCloseEdit() {
    this.closeEdit.emit(false);
  }

  onSubmit() {
    const user = {
      username: this.user.username,
      lastname: this.user.lastname,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
    }
    this.userService.updateUser(this.username, user).subscribe({
      next: (res: HttpResponse<any>) => {
        if(res.status === 202){
          console.log(res);
          this.onCloseEdit();
          this.showToast.emit(true);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error update user:', err);
        const error = err.error.error;
        const message = err.error.message;
        this.failDelete(message, error);
      }
    });
  }

  failDelete(message : string, error : string) {
    this.messageService.add({ severity: 'error', summary: message , detail: error, life: 3000 });
  }
  
}
