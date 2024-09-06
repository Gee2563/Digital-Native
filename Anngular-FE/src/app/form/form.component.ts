import { Component } from '@angular/core';
import { FormService } from '../services/form.service';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  constructor(
    private formService: FormService,
    private emailService: EmailService
  ) {}

  onSubmit(form: any) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('name', form.value.name);
      formData.append('email', form.value.email);
      formData.append('cardNumber', form.value.cardNumber);

      this.formService.postForm(formData).subscribe(
        response => {
          if (response.ok) {
            alert('Form submitted successfully');
            this.emailService.sendEmail(formData).subscribe();
          } else {
            alert('Form submission failed');
          }
        },
        error => {
          console.error('Error:', error);
          alert('Form submission failed');
        }
      );
    }
  }
}
