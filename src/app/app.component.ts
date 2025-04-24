import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigateComponentComponent } from "./navigate/navigate-component/navigate-component.component";
import { UserComponentComponent } from "./user-component/user-component.component";
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigateComponentComponent, UserComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Final-Exercise';
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
}
