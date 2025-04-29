import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../../share/share.module';
import { UserService } from '../userService/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, ShareModule],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {

  username: string = '';

  @Input({ required: true }) user: any;
  @Input({ required: true }) openEdit: boolean = false;
  @Output() closeEdit = new EventEmitter<boolean>();

  constructor(private userService: UserService, private route: ActivatedRoute) { }

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
      phoneNumber: this.user.phoneNumber
    }
    this.userService.updateUser(this.username, user).subscribe({
      next: (res: any) => {
        this.onCloseEdit();
        console.log(res);
      }
    });
  }
}
