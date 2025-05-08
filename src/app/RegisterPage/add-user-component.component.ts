import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user-component/userService/user.service';
import { HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
import { HttpErrorResponse } from '@angular/common/http';
import { EmailServiceService } from '../email/email-service.service';
@Component({
  selector: 'app-add-user-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastModule],
  templateUrl: './add-user-component.component.html',
  styleUrl: './add-user-component.css',
  providers: [MessageService],
})
export class AddUserComponentComponent {
  username = '';
  lastname = '';
  email = '';
  password = '';
  phone = '';
  openAddUser = false;
  check!: boolean;
  @ViewChild('userForm') userForm!: NgForm;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  onSubmit() {
    const user = {
      username: this.username,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      phone: this.phone
    };
    
    console.log("user: ", user);
    this.userService.createUser(user).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
        if (response.status === 201) {
          const detail = response.body.error;
          const message = response.body.message;
          this.successRegister(message, detail);
        } else {
          this.failRegister('Tạo user thất bại', 'Phản hồi không mong đợi từ máy chủ.');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Full error:', err);
        let message = err.error.error;
        let detail = err.error.message;
        this.failRegister(message, detail);
      }

    });
  }

  successRegister(message: string, detail: string){
    this.messageService.add({ severity: 'success', summary: message, detail: detail, life: 3000 });
    this.userForm.resetForm(); // reset the form
  }

  failRegister(message: string, error: string) {
    this.messageService.add({ severity: 'error', summary: message, detail: error, life: 3000 });
  }
}
