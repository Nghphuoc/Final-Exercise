import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { ShareModule } from "../share/share.module";
import { UserService } from "../user-component/userService/user.service";
@Component({
    selector: 'app-login-component',
    imports: [CommonModule, FormsModule, ShareModule, ToastModule],
    templateUrl: './forgot-password.component.html',
    providers: [MessageService],
})

export class ForgotPasswordComponent {
    username: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    isVerifying: boolean = false;
    isVerified: boolean = false;
    @ViewChild('forgotForm') userForm!: NgForm;
    constructor(private userService: UserService, private messageService: MessageService) { }
    
    onSubmit() {
        if (!this.username || !this.email || !this.password || !this.confirmPassword) {
            this.toast("error","Please fill in all fields");
            return;
        }
        if(this.checkEquanlsPassword(this.password, this.confirmPassword)){
            this.verifyUser();
        }else{
            this.toast("error","Password is not match");
        }
    }

    checkEquanlsPassword(password : string, confirmPassword : string) : boolean{
        if(password === confirmPassword){
            return true;
        }
        return false;
    }

    // truy cập bien (get) luon check khi truy cap
    get passwordMismatch(): boolean {
        return (
            this.confirmPassword !== '' &&
            this.password !== '' &&
            this.confirmPassword !== this.password
        );
    }
    
    verifyUser() {
        this.isVerifying = true;
        const data = {
            username : this.username,
            email : this.email,
            password : this.password
        }
        console.log("data: ",data);
        this.userService.forgotPassword(data).subscribe({
            next: (response) => {
                this.isVerifying = false;
                this.isVerified = true; 
                const error = response.body.error;
                const message = response.body.message;
                console.log("response: ",response);
                if(response.status === 202){
                    this.toast("success",error);
                    this.userForm.resetForm(); // reset the form
                }
            },
            error: (error) => {
                console.log(error)
                this.isVerifying = false;
                let message = error.error?.error;
                if(message == null){
                    message = "Server Error"
                }
                this.toast("error", message);
            }
        });
    } 

    toast(status : string, message : string){
        this.messageService.add({ severity: status, summary: status, detail: message });
    }
    
}
