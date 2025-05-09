import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;

    const mockData = {
        username: 'kimjayoung',
        email: 'kim@domain.com',
        password: 'newSecurePassword123'
      };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService],
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should filter users with ROLE_USER', () => {
        const mockUsers = [ // fake data
            { username: 'user1', role: { roleName: 'ROLE_USER' } },
            { username: 'admin1', role: { roleName: 'ROLE_ADMIN' } },
        ];

        service.getAllUsers().subscribe(users => {
            expect(users.length).toBe(1);
            expect(users[0].username).toBe('user1'); // check phần tử đầu tiên có trùng khớp 0
        });

        const req = httpMock.expectOne('http://localhost:8080/api/user');
        expect(req.request.method).toBe('GET');
        req.flush(mockUsers);
    });

    it('should return user by username', () => {
        const mockUser = { username: 'john', role: { roleName: 'ROLE_USER' } };

        service.getUserByName('john').subscribe(user => {
            expect(user).toEqual(mockUser);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/user/john');
        expect(req.request.method).toBe('GET');
        req.flush(mockUser);
    });

    it('should create a new user', () => {
        const mockUser = { username: 'newuser', password: '123' };

        service.createUser(mockUser).subscribe(res => {
            expect(res.status).toBe(200);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/auth/public/signup');
        expect(req.request.method).toBe('POST');
        req.flush('User created successfully');
    });

    it('should update a user', () => {
        const updatedUser = { username: 'john', password: 'newpass' };

        service.updateUser('john', updatedUser).subscribe(res => {
            expect(res).toBe('User updated');
        });

        const req = httpMock.expectOne('http://localhost:8080/api/user/john');
        expect(req.request.method).toBe('PUT');
        req.flush('User updated');
    });

    it('should delete a user', () => {
        service.deleteUser('john').subscribe(res => {
            expect(res.body.message).toBe("User deleted");
        });

        const req = httpMock.expectOne('http://localhost:8080/api/user/john');
        expect(req.request.method).toBe('DELETE');
        req.flush({ message: 'User deleted' });
    });

    it('should login a user and return full HttpResponse', () => {
        const loginData = { username: 'john', password: '123' };
        const mockResponse = { token: 'abc123' };

        service.loginUser(loginData).subscribe(response => {
            expect(response.body).toEqual(mockResponse);
            expect(response.status).toBe(202);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/auth/public/login');
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse, { status: 202, statusText: 'OK' });
    
    });

    it('should send PUT request and return success response', () => {
        const mockResponse = new HttpResponse({
          status: 202,
          body: { message: 'Password changed successfully!' }
        });
    
        service.forgotPassword(mockData).subscribe(response => {
          expect(response.status).toBe(202);
          expect(response.body?.message).toContain('Password changed');
        });
    
        const req = httpMock.expectOne(`${service['baseUrl']}/api/auth/public/forgot-password`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(mockData);
    
        req.flush(mockResponse.body, { status: 202, statusText: 'Accepted' });
      });
    
      it('should handle error response', () => {
        const errorMsg = 'Invalid username or email!';
        
        service.forgotPassword(mockData).subscribe({
          next: () => fail('should have failed with 400 error'),
          error: (error: HttpErrorResponse) => {
            expect(error.status).toBe(400);
            expect(error.error.error).toContain('Invalid');
          }
        });
    
        const req = httpMock.expectOne(`${service['baseUrl']}/api/auth/public/forgot-password`);
        req.flush({ error: 'Invalid username or email!' }, { status: 400, statusText: 'Bad Request' });
      });
    
});
