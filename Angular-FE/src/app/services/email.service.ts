import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl = 'http://localhost:3000/send-email'; // This should be updated based on your email sending setup

  constructor(private http: HttpClient) {}

  sendEmail(formData: FormData): Observable<any> {
    return this.http.post(this.emailUrl, formData);
  }
}
