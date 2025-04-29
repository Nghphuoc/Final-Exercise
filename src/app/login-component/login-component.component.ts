import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user-component/userService/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule, ShareModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.css'
})
export class LoginComponentComponent {

  username = '';
  password = '';

  constructor(private userService: UserService, private router: Router) { }

  onLogin() {
    const user = {
      username: this.username,
      password: this.password,
    };

    this.userService.loginUser(user).subscribe({
      next: (response: HttpResponse<any>) => {
        const status = response.status;
        const res = response.body;

        if (status === 202 && res?.jwtToken) {
          alert('Đăng nhập thành công: ' + res.jwtToken);
          sessionStorage.setItem('jwtToken', res.jwtToken);
          sessionStorage.setItem('roles', res.roles);

          if (res.roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/dashboard']);
          } else {
            alert('Bạn không có quyền truy cập trang này!');
            this.router.navigate(['/']);
          }
        } else {
          alert('Đăng nhập thất bại: Thông tin không hợp lệ!');
        }
      },
      error: (err: any) => {
        alert('Đăng nhập thất bại: ' + (err?.error?.message || 'Lỗi máy chủ'));
      }
    });
  }

}
