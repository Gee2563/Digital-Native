import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormService } from '../services/registration.service';
import { EmailService } from '../services/email.service';
import { validName, validEmail, validCreditCard } from '../utils/formValidation';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  showErrors = false;

  constructor(
    private formService: FormService,
    private emailService: EmailService
  ) {}

  // Function to escape user input to prevent sql injection
  escapeHTML(input: string): string {
    return input.replace(/[&<>"']/g, (match) => {
      const escapeMap: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return escapeMap[match];
    });
  }

  // Validation functions
  validateName(name: string): string {
    const result = validName(name);
    return typeof result === 'string' ? result : '';
  }

  validateEmail(email: string): string {
    const result = validEmail(email);
    return typeof result === 'string' ? result : '';
  }

  validateCardNumber(cardNumber: string): string {
    const result = validCreditCard(cardNumber);
    return typeof result === 'string' ? result : '';
  }

  validateField(field: string, value: string): void {
    this.showErrors = true;
    let errorMessage = '';
    switch (field) {
      case 'name':
        errorMessage = this.validateName(value);
        break;
      case 'email':
        errorMessage = this.validateEmail(value);
        break;
      case 'cardNumber':
        errorMessage = this.validateCardNumber(value);
        break;
    }

    // Display error message if any
    const element = document.querySelector(`#${field}Error`);
    if (element) {
      element.textContent = errorMessage;
    }

    // Change the input field color based on validation result
    const inputElement = document.querySelector(`#${field}`);
    if (inputElement) {
      inputElement.classList.toggle('valid', !errorMessage);
      inputElement.classList.toggle('invalid', !!errorMessage);
    }
  }

  onSubmit(form: NgForm): void {
    this.showErrors = true;

    if (form.valid) {
      // Escape inputs before sending them to the server
      const escapedName = this.escapeHTML(form.value.name);
      const escapedEmail = this.escapeHTML(form.value.email);
      const escapedCardNumber = this.escapeHTML(form.value.cardNumber);

      const formData = new FormData();
      formData.append('name', escapedName);
      formData.append('email', escapedEmail);
      formData.append('cardNumber', escapedCardNumber);

      // Post form data to the server and send email if successful
      this.formService.postForm(formData).subscribe({
        next: (response: any) => {
          if (response.ok) {
            alert('Form submitted successfully');
            this.emailService.sendEmail(formData).subscribe();
          } else {
            alert('Form submission failed');
          }
        },
        error: (error: any) => {
          console.error('Error:', error);
          alert('Form submission failed');
        }
      });
    }
  }
}
