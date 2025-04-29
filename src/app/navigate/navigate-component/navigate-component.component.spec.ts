import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigateComponentComponent } from './navigate-component.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
    let component: NavigateComponentComponent;
    let fixture: ComponentFixture<NavigateComponentComponent>;

    beforeEach(() => {
        sessionStorage.setItem('jwtToken', 'test-token'); // Giả lập login
        TestBed.configureTestingModule({
            imports: [NavigateComponentComponent],
            providers: [
                provideHttpClient(),     // ✅ nếu component dùng HttpClient
                {
                    provide: ActivatedRoute, // ✅ Mock ActivatedRoute
                    useValue: {
                        params: of({}),        // mock params nếu cần
                        snapshot: {
                            paramMap: { get: () => null }, // giả lập param
                            queryParamMap: { get: () => null },
                        },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NavigateComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // chạy ngOnInit và binding HTML
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should show Logout button when jwtToken exists', () => {
        const logoutBtn = fixture.debugElement.query(By.css('button'));
        expect(logoutBtn.nativeElement.textContent).toContain('Logout');
    });

    it('should logout and reset token, call syncToken and navigate to /login', () => {
        // Arrange
        spyOn(sessionStorage, 'removeItem');
        spyOn(component, 'syncToken');

        sessionStorage.setItem('jwtToken', 'fake-token');
        component.jwtToken = 'fake-token';
        component.logout();

        expect(sessionStorage.removeItem).toHaveBeenCalledWith('jwtToken');
        expect(component.jwtToken).toBe('');
        expect(component.syncToken).toHaveBeenCalled();
    });

});
