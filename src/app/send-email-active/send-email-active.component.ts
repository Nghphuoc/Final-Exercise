import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { UserService } from '../user-component/userService/user.service';

@Component({
  selector: 'app-send-email-active',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, RouterModule],
  templateUrl: './send-email-active.component.html',
  providers: [MessageService]
})
export class SendEmailActiveComponent {
  emailForm: FormGroup;
  submitted = false;
  isVerifying: boolean = false;
  isVerified: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.emailForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.emailForm.controls; }

  onSubmit() {
    this.isVerifying = true;
    this.submitted = false;
    if (this.emailForm.valid) {
      this.userService.sendMail(this.emailForm.value).subscribe({
        next: (res: any) => {
          this.isVerifying = false;
          this.isVerified = true;
          if (res.status === 200) {
            this.messageService.add({ severity: 'success', summary: res.body.error, detail: res.body.message, life: 3000 });
          }
        },
        error: (err: any) => {
          this.isVerifying = false;
          this.messageService.add({ severity: 'error', summary: err.error.error, detail: err.error.message, life: 3000 });
        }
      });
    }
  }
}
