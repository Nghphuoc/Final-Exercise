import { Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { AddUserComponentComponent } from './RegisterPage/add-user-component.component';
import { AuthGuard } from './auth-guard/AuthGuard';
import { UserDetailComponent } from './user-component/user-detail/user-detail.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponentComponent
    },
    {
        path: 'dashboard', component: HomePageComponent, canActivate: [AuthGuard]
    },
    {
        path: 'home', loadComponent: () => import('./user-component/user-component.component')
            .then(m => m.UserComponentComponent), canActivate: [AuthGuard] // Chỉ cho phép truy cập nếu đã đăng nhập
    },
    {
        path: 'register', component: AddUserComponentComponent
    },
    {
        path: 'userDetail/:username', component: UserDetailComponent
    }

];
