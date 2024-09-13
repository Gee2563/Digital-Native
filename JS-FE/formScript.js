import { validName, validEmail, validCreditCard } from './utils/formValidation.js';
import { postSubmitForm } from './services/formService.js';

const userid = 'USERID'
const templateid = 'TEMPLATEID'
emailjs.init(userid);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');

    // Validation handler
    const validateField = (inputElement, validator, errorElement) => {
        const validationResult = validator(inputElement.value);
        if (validationResult === true) {
            inputElement.classList.add('valid');
            inputElement.classList.remove('invalid');
            errorElement.style.display = 'none';
            errorElement.textContent = '';  // Clear any previous error message
        } else {
            inputElement.classList.add('invalid');
            inputElement.classList.remove('valid');
            errorElement.style.display = 'block';
            errorElement.textContent = validationResult;  // Show the error message
        }
    };

    // Add event listeners for real-time validation
    document.getElementById('name').addEventListener('input', function () {
        validateField(this, validName, document.getElementById('nameError'));
    });

    document.getElementById('email').addEventListener('input', function () {
        validateField(this, validEmail, document.getElementById('emailError'));
    });

    document.getElementById('cardNumber').addEventListener('input', function () {
        validateField(this, validCreditCard, document.getElementById('cardNumberError'));
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Perform final validation on submit
        validateField(document.getElementById('name'), validName, document.getElementById('nameError'));
        validateField(document.getElementById('email'), validEmail, document.getElementById('emailError'));
        validateField(document.getElementById('cardNumber'), validCreditCard, document.getElementById('cardNumberError'));

        // Check if all fields are valid
        if (!document.querySelector('.invalid')) {
            // Form submission logic here
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                cardNumber: document.getElementById('cardNumber').value
            };
            //send to back in for checking and storing, then send email
            postSubmitForm(formData)
            .catch(error => console.error('Error submitting form', error));
            emailjs.sendForm(userid, templateid, form)
                .then((response) => {
                    console.log('Email sent successfully', response);
                    form.reset();
                })
                .catch((error) => {
                    console.error('Error sending email', error);
                });
            // Optionally reset form or redirect
            form.reset();
        } else {
            // Focus on the first invalid input
            const firstInvalid = document.querySelector('.invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });
});
