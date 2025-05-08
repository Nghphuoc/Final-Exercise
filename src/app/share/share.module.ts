import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from './Pipe-custom/pipe-phone';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    PhoneFormatPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [PhoneFormatPipe,CommonModule,RouterModule,FormsModule,ReactiveFormsModule]
})
export class ShareModule { }
