import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ShareModule } from '../share/share.module';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule,FormsModule,ShareModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.css'
})
export class LoginComponentComponent {

  username = '';
  password = '';
  
  constructor(private userService : UserService, private router : Router) { }

  onLogin(){
    const user = {
    username: this.username,
    password: this.password,
  }

  //console.log('Đăng nhập:', user);
    this.userService.loginUser(user).subscribe({
      next: (res: any) => {alert('Đăng nhập thành công:' + res.jwtToken);
        sessionStorage.setItem('jwtToken', res.jwtToken);
        sessionStorage.setItem('roles', res.roles);
        if(res.roles == 'ROLE_ADMIN'){
          this.router.navigate(['/dashboard']);
        }else{
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        alert('Đăng nhập thất bại:' + err.error.message);
      }
    });
  }
}
