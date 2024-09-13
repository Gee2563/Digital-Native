import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl = 'https://api.mailgunner.com/v3/sandboxbef650489a0c405d9de00044d65961e1/messages';  

  private apiKey = 'bba84055b8dcc0a41268a90d3c531060-826eddfb-5cefebff'; 

  constructor(private http: HttpClient) {}

  sendEmail(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('from', 'georgegdsmith@hotmail.co.uk'); 
    body.set('to', 'test@dn-uk.com');
    body.set('subject', 'Form Submission');
    body.set('text', `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nCard Number: ${formData.get('cardNumber')}`);

    return this.http.post(this.emailUrl, body.toString(), { headers });
  }
}
