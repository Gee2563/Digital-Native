// formValidation.test.js

const { validName, validEmail, validCreditCard } = require('../utils/formValidation.js');

// Add this line if you installed @testing-library/jest-dom for extra matchers
require('@testing-library/jest-dom');

// Setup a simple mock DOM environment
beforeEach(() => {
    document.body.innerHTML = `
        <div>
            <input type="text" id="name" />
            <input type="email" id="email" />
            <input type="text" id="creditCard" />
            <form id="userForm"></form>
        </div>
    `;
});

describe('Form Validation Tests', () => {
    test('should return true for valid names', () => {
        expect(validName('John Doe')).toBe(true);
    });

    test('should return an error message for invalid names', () => {
        expect(validName('John123')).toBe('Please enter a valid name');
        expect(validName('Jo')).toBe('Please enter a valid name');
        expect(validName('John Doe!')).toBe('Please enter a valid name');
    });

    test('should return true for valid emails', () => {
        expect(validEmail('john@example.com')).toBe(true);
    });

    test('should return an error message for invalid emails', () => {
        expect(validEmail('johnexample.com')).toBe('Please enter a valid email address');
        expect(validEmail('john@.com')).toBe('Please enter a valid email address');
        expect(validEmail('john@com')).toBe('Please enter a valid email address');
    });

    test('should return true for valid credit card numbers', () => {
        expect(validCreditCard('4111111111111111')).toBe(true);
    });

    test('should return an error message for invalid credit card numbers', () => {
        expect(validCreditCard('4111111111111112')).toBe('Please enter a valid credit card number');
        expect(validCreditCard('411111111111')).toBe('Please enter a valid credit card number');
        expect(validCreditCard('411111111111111a')).toBe('Please enter a valid credit card number');
    });

    test('should handle empty credit card input', () => {
        expect(validCreditCard('')).toBe('Please enter a valid credit card number');
    });
});
