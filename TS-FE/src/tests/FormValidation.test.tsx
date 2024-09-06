import React from 'react';
import {validName, validEmail, validCreditCard} from '../utils/formValidation';

describe('FormValidation', () => {
    test('validates name input', () => {
        expect(validName('John123')).toBe('Please enter a valid name');
        expect(validName('John Doe')).toBe(true);
    });
    
    test('validates email input', () => {
        expect(validEmail('invalid-email')).toBe('Please enter a valid email address');
        expect(validEmail('valid@email.com')).toBe(true);
    });

    test('validates credit card input', () => {
        expect(validCreditCard('1234')).toBe('Please enter a valid credit card number');
        expect(validCreditCard('1111222233334444')).toBe(true);
    });
    test('Valid credit card algorithm', () => {
        expect(validCreditCard('4111111111111111')).toBe(true);
        expect(validCreditCard('1111222233334445')).toBe('Please enter a valid credit card number');
    });
});