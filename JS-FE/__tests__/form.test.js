require('@testing-library/jest-dom');
import { validName, validEmail, validCreditCard } from '../utils/formValidation'; 

describe('Form and Input Rendering', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div>
                <form id="userForm">
                    <input type="text" id="name" />
                    <div id="nameError" class="error-message"></div>
                    <input type="email" id="email" />
                    <div id="emailError" class="error-message"></div>
                    <input type="text" id="creditCard" />
                    <div id="creditCardError" class="error-message"></div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        `;
    });

    test('should render form', () => {
        const form = document.getElementById('userForm');
        expect(form).not.toBeNull();
    });

    test('should render name input', () => {
        const nameInput = document.getElementById('name');
        expect(nameInput).not.toBeNull();
    });

    test('should render email input', () => {
        const emailInput = document.getElementById('email');
        expect(emailInput).not.toBeNull();
    });

    test('should render credit card input', () => {
        const creditCardInput = document.getElementById('creditCard');
        expect(creditCardInput).not.toBeNull();
    });

    test('should render submit button', () => {
        const submitButton = document.querySelector('button[type="submit"]');
        expect(submitButton).not.toBeNull();
    });
});

describe('Input Validation', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div>
                <form id="userForm">
                    <input type="text" id="name" />
                    <div id="nameError" class="error-message"></div>
                    <input type="email" id="email" />
                    <div id="emailError" class="error-message"></div>
                    <input type="text" id="creditCard" />
                    <div id="creditCardError" class="error-message"></div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        `;
    });

    // Can be refactored to a helper function in utils
    function validateField(inputElement, validator, errorElement) {
        const error = validator(inputElement.value);
        if (error === true) {
            inputElement.classList.add('valid');
            inputElement.classList.remove('invalid');
            errorElement.textContent = ''; // Clear previous error
        } else {
            inputElement.classList.add('invalid');
            inputElement.classList.remove('valid');
            errorElement.textContent = error; // Set new error message
        }
    }

    test('should return error message when name contains a number', () => {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');

        nameInput.value = 'John123';
        // Mimic the real-time validation behavior
        validateField(nameInput, validName, nameError);
        
        expect(nameError).toHaveTextContent('Please enter a valid name');
    });

    test('should return error message when name contains a special character', () => {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');

        nameInput.value = 'John@Doe';
        // Mimic the real-time validation behavior
        validateField(nameInput, validName, nameError);
        
        expect(nameError).toHaveTextContent('Please enter a valid name');
    });

    test('should return error message when email is missing a domain', () => {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');

        emailInput.value = 'john@example';
        // Mimic the real-time validation behavior
        validateField(emailInput, validEmail, emailError);
        
        expect(emailError).toHaveTextContent('Please enter a valid email address');
    });

    test('should return error message when email is missing the "@" symbol', () => {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');

        emailInput.value = 'johnexample.com';
        // Mimic the real-time validation behavior
        validateField(emailInput, validEmail, emailError);
        
        expect(emailError).toHaveTextContent('Please enter a valid email address');
    });

    test('should return error message when credit card number is invalid', () => {
        const creditCardInput = document.getElementById('creditCard');
        const creditCardError = document.getElementById('creditCardError');

        creditCardInput.value = '411111111111111a';
        // Mimic the real-time validation behavior
        validateField(creditCardInput, validCreditCard, creditCardError);
        
        expect(creditCardError).toHaveTextContent('Please enter a valid credit card number');
    });

    test('should return error message when credit card number is too short', () => {
        const creditCardInput = document.getElementById('creditCard');
        const creditCardError = document.getElementById('creditCardError');

        creditCardInput.value = '411111111111';
        // Mimic the real-time validation behavior
        validateField(creditCardInput, validCreditCard, creditCardError);
        
        expect(creditCardError).toHaveTextContent('Please enter a valid credit card number');
    });

    test('should return error message when credit card number is empty', () => {
        const creditCardInput = document.getElementById('creditCard');
        const creditCardError = document.getElementById('creditCardError');

        creditCardInput.value = '';
        // Mimic the real-time validation behavior
        validateField(creditCardInput, validCreditCard, creditCardError);
        
        expect(creditCardError).toHaveTextContent('Please enter a valid credit card number');
    });

    test('should clear error message when input is valid', () => {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');

        nameInput.value = 'John Doe';
        // Mimic the real-time validation behavior
        validateField(nameInput, validName, nameError);
        
        expect(nameError).toHaveTextContent('');
    });

    test('should add valid class when input is valid', () => {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');

        nameInput.value = 'John Doe';
        // Mimic the real-time validation behavior
        validateField(nameInput, validName, nameError);
        
        expect(nameInput).toHaveClass('valid');
    });

    test('should remove invalid class when input is valid', () => {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');

        nameInput.value = 'John Doe';
        // Mimic the real-time validation behavior
        validateField(nameInput, validName, nameError);
        
        expect(nameInput).not.toHaveClass('invalid');
    });

    test('should add invalid class when input is invalid', () => {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');

        nameInput.value = 'John123';
        // Mimic the real-time validation behavior
        validateField(nameInput, validName, nameError);
        
        expect(nameInput).toHaveClass('invalid');
    });

    test('should remove valid class when input is invalid', () => {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');

        nameInput.value = 'John123';
        // Mimic the real-time validation behavior
        validateField(nameInput, validName, nameError);
        
        expect(nameInput).not.toHaveClass('valid');
    });





    
});
