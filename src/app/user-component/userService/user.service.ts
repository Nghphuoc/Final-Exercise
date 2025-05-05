import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<any[]>(this.baseUrl + "/api/user").pipe(
      map(data => data.filter(data => data.role?.roleName === 'ROLE_USER')),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err); //
      })
    );
  }

  getUserByName(username: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/api/user/${username}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err); //
      })
    );
  }

  createUser(user: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(
      `${this.baseUrl}/api/auth/public/signup`,
      user,
      { observe: 'response' }
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err); //
      })
    );
  }

  updateUser(username: string, user: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/api/user/${username}`, user, {
      responseType: 'text' as 'json'// báo Angular không cần parse JSON
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err); //
      })
    );
  }

  deleteUser(username: string): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(`${this.baseUrl}/api/user/${username}`,
      { observe: 'response' })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err); //
        })
      );
  }

  loginUser(user: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(
      `${this.baseUrl}/api/auth/public/login`,
      user,
      { observe: 'response' }
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err); //
      })
    );
  }

  forgotPassword(data : any): Observable<HttpResponse<any>> {
    return this.httpClient.put<any>(
      `${this.baseUrl}/api/auth/public/forgot-password`,data,
      { observe: 'response' }
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    );
  }
}
