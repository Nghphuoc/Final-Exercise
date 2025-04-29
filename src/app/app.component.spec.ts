import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // ✅ Standalone component => import
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
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Final-Exercise' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Final-Exercise');
  });
  
});
