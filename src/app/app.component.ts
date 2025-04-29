import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigateComponentComponent } from "./navigate/navigate-component/navigate-component.component";
import { UserService } from './user-component/userService/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigateComponentComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'Final-Exercise';
  openAddUser = false;
  dataUser: any[] = [];

  constructor(private userSevice: UserService) { }

  openAddUserComponent() {
    this.openAddUser = true;
  }
  closeAddUserComponent() {
    this.openAddUser = false;
  }

  onClickClose(check: boolean) {
    this.openAddUser = check;
  }
}
