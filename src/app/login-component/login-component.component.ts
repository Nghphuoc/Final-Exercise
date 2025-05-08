import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user-component/userService/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast';
import { EmailServiceService } from '../email/email-service.service';
@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule, ShareModule, ToastModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.css',
  providers: [MessageService],
})
export class LoginComponentComponent {

  username = '';
  password = '';

  constructor(
    private userService: UserService, 
    private router: Router, 
    private messageService: MessageService,
  ) { }

  onLogin() {
    const user = {
      username: this.username,
      password: this.password,
    };

    this.userService.loginUser(user).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
        const status = response.status;
        const res = response.body;

        if (status === 202 && res?.jwtToken) {
          sessionStorage.setItem('jwtToken', res.jwtToken);
          sessionStorage.setItem('roles', res.roles);
          this.successLogin();

          if (res.roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/landing-page']);
          }
        } else {
          //this.failLogin();
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log("fukk",err);
        let error = err.error?.error;
        let message = err.error?.message;
        if(error == null && message == null){
          error = "Server Error";
          message = "Cannot connect with server";
        }
        this.failLogin(message, error);
      }
    });
  }

  successLogin() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login success', life: 3000 });
  }

  failLogin(message : string, error : string) {
    this.messageService.add({ severity: 'error', summary: message, detail: error, life: 3000 });
  }
}
