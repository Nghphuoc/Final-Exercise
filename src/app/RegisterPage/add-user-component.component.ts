import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-user-component.component.html',
  styleUrl: './add-user-component.css'
})
export class AddUserComponentComponent {
  username = '';
  lastname = '';
  email = '';
  password = '';
  phone = '';
  openAddUser = false;

  check!: boolean;

  constructor(private userService : UserService) { }

  onSubmit(){
    const user = {
    username: this.username,
    lastname: this.lastname,
    email: this.email,
    password: this.password,
    phone: this.phone,
  };

    this.userService.createUser(user).subscribe({
    next: (res) => {
      console.log('Tạo user thành công:', res);
    }
  });
  
  }
}
