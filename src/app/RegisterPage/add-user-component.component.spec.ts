import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponentComponent } from './add-user-component.component';
import { UserService } from '../user-component/userService/user.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

describe('AddUserComponentComponent', () => {

    let component: AddUserComponentComponent;
    let fixture: ComponentFixture<AddUserComponentComponent>;
    let mockUserService: jasmine.SpyObj<UserService>;
    let mockMessageService: jasmine.SpyObj<MessageService>;

    beforeEach(() => {
        mockUserService = jasmine.createSpyObj('UserService', ['createUser']);
        mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

        TestBed.configureTestingModule({
            imports: [AddUserComponentComponent],
            providers: [
                { provide: UserService, useValue: mockUserService },
                { provide: MessageService, useValue: mockMessageService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddUserComponentComponent);
        component = fixture.componentInstance;
    });

    it('should call successRegister() when createUser returns 201', () => {
        const fakeResponse = new HttpResponse({ status: 201, body: {} });
        mockUserService.createUser.and.returnValue(of(fakeResponse));
        const spySuccess = spyOn(component, 'successRegister');

        component.username = 'testuser';
        component.password = '123456';
        component.email = 'test@gmail.com';
        component.phone = '+84121212446';
        component.lastname = 'abv';
        component.onSubmit();

        expect(mockUserService.createUser).toHaveBeenCalled();
        expect(spySuccess).toHaveBeenCalled();
    });

    it('should call failRegister() when createUser returns unexpected status', () => {
        const fakeResponse = new HttpResponse({ status: 400 });
        mockUserService.createUser.and.returnValue(of(fakeResponse));
        const spyFail = spyOn(component, 'failRegister');

        component.username = 'testuser';
        component.onSubmit();

        expect(spyFail).toHaveBeenCalledWith('Tạo user thất bại', 'Phản hồi không mong đợi từ máy chủ.');
    });

    it('should handle error from createUser and call failRegister()', () => {
        const fakeError = new HttpErrorResponse({
            status: 400,
            error: {
                error: 'Validation Failed',
                message: 'Username is already taken'
            }
        });
        mockUserService.createUser.and.returnValue(throwError(() => fakeError));
        const spyFail = spyOn(component, 'failRegister');

        component.username = 'testuser';
        component.onSubmit();

        expect(spyFail).toHaveBeenCalledWith('Validation Failed', 'Username is already taken');
    });
});
