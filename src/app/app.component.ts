import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigateComponentComponent } from "./navigate/navigate-component/navigate-component.component";
import { UserComponentComponent } from "./user-component/user-component.component";
import { UserService } from './service/user.service';
import { AddUserComponentComponent } from "./add-user-component/add-user-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigateComponentComponent, UserComponentComponent, AddUserComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Final-Exercise';
  openAddUser = false;
  dataUser: any[] = [];

  constructor(private userSevice : UserService) { }
  
  ngOnInit() {
    this.getAll();
  }
  getAll(){
    this.userSevice.getAllUsers().subscribe((data) => {
      this.dataUser = data;
    });
  }
  openAddUserComponent() {
    this.openAddUser = true;
  }
  closeAddUserComponent() {
    this.openAddUser = false;
  }
}
