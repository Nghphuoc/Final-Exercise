import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from './Pipe-custom/pipe-phone';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    PhoneFormatPipe,
    FormsModule
  ],
  exports: [PhoneFormatPipe,CommonModule,RouterModule,FormsModule]
})
export class ShareModule { }
