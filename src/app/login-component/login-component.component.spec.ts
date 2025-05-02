import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponentComponent } from './login-component.component';
import { UserService } from '../user-component/userService/user.service';
import { MessageService } from 'primeng/api';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponentComponent', () => {
    let component: LoginComponentComponent;
    let fixture: ComponentFixture<LoginComponentComponent>;
    let mockUserService: jasmine.SpyObj<UserService>;
    let mockMessageService: jasmine.SpyObj<MessageService>;

    beforeEach(async () => {
        mockUserService = jasmine.createSpyObj('UserService', ['loginUser']);
        mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

        await TestBed.configureTestingModule({
            imports: [LoginComponentComponent, RouterTestingModule], // Correct for Standalone Component
            providers: [
                { provide: UserService, useValue: mockUserService }, // DI 
                { provide: MessageService, useValue: mockMessageService },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponentComponent);
        component = fixture.componentInstance;
    });

    it('should store jwtToken and navigate to dashboard if admin login succeeds', () => {
        const mockResponse = new HttpResponse({
            status: 202,
            body: {
                jwtToken: 'fake-jwt-token',
                roles: ['ROLE_ADMIN']
            }
        });

        spyOn(component, 'successLogin');

        mockUserService.loginUser.and.returnValue(of(mockResponse));

        component.username = 'admin';
        component.password = 'password';
        component.onLogin();
        // check save session
        expect(sessionStorage.getItem('jwtToken')).toBe('fake-jwt-token');
        expect(sessionStorage.getItem('roles')).toBe('ROLE_ADMIN');
        expect(component.successLogin).toHaveBeenCalled();
    });

    it('should alert and navigate to / if not admin', () => {
        spyOn(window, 'alert');

        const mockResponse = new HttpResponse({
            status: 202,
            body: {
                jwtToken: 'fake-jwt-token',
                roles: ['ROLE_USER']
            }
        });

        spyOn(component, 'successLogin');

        mockUserService.loginUser.and.returnValue(of(mockResponse));

        component.onLogin();
    });

    it('should call failLogin on error response', () => {
        const mockError = new HttpErrorResponse({
            status: 401,
            error: {
                error: 'Unauthorized',
                message: 'Invalid credentials'
            }
        });

        spyOn(component, 'failLogin');

        mockUserService.loginUser.and.returnValue(throwError(() => mockError));

        component.onLogin();

        expect(component.failLogin).toHaveBeenCalledWith('Invalid credentials', 'Unauthorized');
    });
});
