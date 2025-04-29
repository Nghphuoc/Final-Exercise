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
      // map((response: any) => {
      //   return response;
      // }),
      map(data => data.filter(data => data.role?.roleName === 'ROLE_USER')),
      catchError(this.handleError)
    );
  }

  getUserByName(username: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/api/user/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/auth/public/signup`, user, {
      responseType: 'text' as 'json'
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(username: string, user: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/api/user/${username}`, user,{
      responseType: 'text' as 'json'// 👈 báo Angular không cần parse JSON
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(username: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/api/user/${username}`).pipe(
      catchError(this.handleError) // Xử lý lỗi
    );
  }

  loginUser(user: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(
      `${this.baseUrl}/api/auth/public/login`,
      user,
      { observe: 'response' } // <-- lấy full response
    ).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
