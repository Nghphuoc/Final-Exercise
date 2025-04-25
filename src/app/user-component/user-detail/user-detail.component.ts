import { Component, OnInit } from '@angular/core';
import { PhoneFormatPipe } from '../../Pipe-custom/pipe-phone';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  imports: [PhoneFormatPipe,RouterModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{

  username : string = '';
  user : any;

  constructor(private route: ActivatedRoute, private userService : UserService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('username');
      if (name) {
        this.username = name;
        this.getUser(name);
      }
    });
  }

  getUser(username : string){
    this.userService.getUserByName(username).subscribe({
    next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error('Lỗi gọi API:', err);
      }
    });
  }
  
}
