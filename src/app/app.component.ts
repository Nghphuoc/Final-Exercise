import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigateComponentComponent } from "./navigate/navigate-component/navigate-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigateComponentComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Final-Exercise';
}
