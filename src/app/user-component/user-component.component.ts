import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { PhoneFormatPipe } from '../Pipe-custom/pipe-phone';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule,PhoneFormatPipe,RouterModule],
  templateUrl: './user-component.component.html',
})
export class UserComponentComponent implements OnInit {

  dataUser: any[] = [];

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.userService.getAllUsers().subscribe({
      next: (res: any[]) => {
        console.log('Lấy danh sách user thành công:', res);
        this.dataUser = res;
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách user:', err);
      }
    });
  }

  onClickDetailUser(username : string){
    // this.userService.getUserById(username).subscribe({
    // })
    console.log("name: ", username);
    this.router.navigate([`userDetail/${username}`]);
  }
}
