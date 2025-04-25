import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import {FormsModule} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login-component.component.html'
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
        localStorage.setItem('jwtToken', res.jwtToken);
        this.router.navigate(['/home']);
      }
      
    });
  }
}
