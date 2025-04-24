import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule],
  templateUrl: './user-component.component.html',
})
export class UserComponentComponent {
  @Input({required : true}) dataUser!: any[];
}
