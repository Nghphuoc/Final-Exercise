import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../userService/user.service';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockUserService: any;
  let mockRouter: any;
  let mockMessageService: any;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj(['getUserByName', 'deleteUser']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockMessageService = jasmine.createSpyObj(['add']);

    await TestBed.configureTestingModule({
      imports: [UserDetailComponent], // standalone component
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ username: 'john' })
          }
        },
        { provide: MessageService, useValue: mockMessageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
  });

    it('should call getUser on ngOnInit', () => { // tét ngOnInit 
        spyOn(component, 'getUser');
        component.ngOnInit();
        expect(component.getUser).toHaveBeenCalled(); // toHaveBeenCalled có gọi hay ko áá
    });

    it('should fetch user by username', () => {
        const mockUser = { username: 'john', email: 'john@example.com' };
        mockUserService.getUserByName.and.returnValue(of(mockUser));

        component.getUser();

        expect(mockUserService.getUserByName).toHaveBeenCalledWith('john');
        expect(component.user).toEqual(mockUser);
        expect(component.isLoading).toBeFalse();
    });

    it('should fetch user by username', () => {
        const mockUser = { username: 'john', email: 'john@example.com' };
        mockUserService.getUserByName.and.returnValue(of(mockUser));

        component.getUser();

        expect(mockUserService.getUserByName).toHaveBeenCalledWith('john');
        expect(component.user).toEqual(mockUser);
        expect(component.isLoading).toBeFalse();
    });

    it('should delete user and navigate to /home on success', () => {
        const mockResponse = new HttpResponse({ status: 202 });
        mockUserService.deleteUser.and.returnValue(of(mockResponse));
        spyOn(component, 'successDelete');

        component.username = 'john';
        component.deleteUserByuserName();

        expect(mockUserService.deleteUser).toHaveBeenCalledWith('john');
        expect(component.successDelete).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });
    
    it('should handle error on deleteUser failure', () => {
        // Giả lập lỗi có cấu trúc 3 lớp 'error' giống như trong component
        const mockError = new HttpErrorResponse({
          error: {
            error: 'Some error',  // Thêm thông tin chi tiết lỗi nếu cần
            message: 'User not found'
          },
          status: 404
        });

        mockUserService.deleteUser.and.returnValue(throwError(() => mockError)); 
        spyOn(component, 'failDelete'); // Giám sát failDelete
        component.username = 'john';
        component.deleteUserByuserName(); // Gọi phương thức để xóa user
        expect(component.failDelete).toHaveBeenCalledWith('User not found', 'Some error');
      });
      
    it('should open and close edit mode', () => {
        component.onOpenEdit();
        expect(component.openEdit).toBeTrue();

        spyOn(component, 'getUser');
        component.onCloseEdit(false);
        expect(component.openEdit).toBeFalse();
        expect(component.getUser).toHaveBeenCalled();
    });

})
