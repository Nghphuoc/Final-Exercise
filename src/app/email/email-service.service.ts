import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  sendEmail(user: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(
      `${this.baseUrl}/api/email/send-html`,
      user,
      { observe: 'response' }
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err); //
      })
    );
  }
}
