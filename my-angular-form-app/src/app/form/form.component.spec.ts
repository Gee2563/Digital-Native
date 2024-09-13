import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormComponent } from './form.component';
import { FormService } from '../services/registration.service';
import { EmailService } from '../services/email.service';
import { of, throwError } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let formService: FormService;
  let emailService: EmailService;
  let formServiceSpy: jasmine.SpyObj<FormService>;
  let emailServiceSpy: jasmine.SpyObj<EmailService>;

  beforeEach(async () => {
    const formServiceSpyObj = jasmine.createSpyObj('FormService', ['postForm']);
    const emailServiceSpyObj = jasmine.createSpyObj('EmailService', ['sendEmail']);

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: FormService, useValue: formServiceSpyObj },
        { provide: EmailService, useValue: emailServiceSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(FormService);
    emailService = TestBed.inject(EmailService);
    formServiceSpy = TestBed.inject(FormService) as jasmine.SpyObj<FormService>;
    emailServiceSpy = TestBed.inject(EmailService) as jasmine.SpyObj<EmailService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate name correctly', () => {
    expect(component.validateName('1')).toBe('Please enter a valid name');
    expect(component.validateName('AB')).toBe('Please enter a valid name');
    expect(component.validateName('A1B2')).toBe('Please enter a valid name');
    expect(component.validateName('A very long name that exceeds fifty characters')).toBe('Please enter a valid name');
    expect(component.validateName('Valid Name')).toBe('');
  });

  it('should validate email correctly', () => {
    expect(component.validateEmail('1')).toBe('Please enter a valid email address');
    expect(component.validateEmail('plainaddress')).toBe('Please enter a valid email address');
    expect(component.validateEmail('test@.com')).toBe('Please enter a valid email address');
    expect(component.validateEmail('test@example.com')).toBe('');
  });

  it('should validate credit card number correctly', () => {
    expect(component.validateCardNumber('1')).toBe('Please enter a valid credit card number');
    expect(component.validateCardNumber('1234')).toBe('Please enter a valid credit card number');
    expect(component.validateCardNumber('1234567812345678')).toBe('Please enter a valid credit card number');
    expect(component.validateCardNumber('4532015112830366')).toBe('');
  });

  it('should call formService.postForm and emailService.sendEmail on valid form submission', () => {
    const form = {
      valid: true,
      value: {
        name: 'Valid Name',
        email: 'test@example.com',
        cardNumber: '4532015112830366'
      }
    } as NgForm;

    formServiceSpy.postForm.and.returnValue(of({ ok: true }));
    emailServiceSpy.sendEmail.and.returnValue(of({}));

    component.onSubmit(form);

    expect(formServiceSpy.postForm).toHaveBeenCalled();
    expect(emailServiceSpy.sendEmail).toHaveBeenCalled();
  });

  it('should handle form submission error', () => {
    const form = {
      valid: true,
      value: {
        name: 'Valid Name',
        email: 'test@example.com',
        cardNumber: '4532015112830366'
      }
    } as NgForm;

    formServiceSpy.postForm.and.returnValue(throwError(() => new Error('Submission failed')));

    spyOn(window, 'alert');
    component.onSubmit(form);

    expect(formServiceSpy.postForm).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Form submission failed');
  });
});
