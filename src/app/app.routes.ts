import { Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AddUserComponentComponent } from './registerpage/add-user-component.component';
import { AuthGuard } from './auth-guard/AuthGuard';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthForUser } from './auth-guard/AuthForUser';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SendEmailActiveComponent } from './send-email-active/send-email-active.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponentComponent
    },
    {
        path: 'forgot-password', component: ForgotPasswordComponent
    },
    {
        path: 'register', component: AddUserComponentComponent
    },
    {
        path: 'dashboard', component: HomePageComponent, canActivate: [AuthGuard]
    },
    {
        path: 'home', loadComponent: () => import('./user-component/user-component.component')
            .then(m => m.UserComponentComponent), canActivate: [AuthGuard]
    },
    {
        path: 'userDetail/:username', loadComponent: () => import('./user-component/user-detail/user-detail.component')
            .then(m => m.UserDetailComponent), canActivate: [AuthGuard]
    },
    {
        path: 'landing-page', component: LandingPageComponent, canActivate: [AuthForUser]
    },
    {
        path: 'access-denied', component: AccessDeniedComponent
    },
    {
        path: 'send-email', component: SendEmailActiveComponent
    },
    {
        path: '**', redirectTo: 'access-denied'
    }
];
