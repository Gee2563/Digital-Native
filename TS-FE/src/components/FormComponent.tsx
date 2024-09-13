import React, { useState, useEffect } from 'react';
import { validName, validEmail, validCreditCard } from '../utils/formValidation';
import { postForm } from '../services/FormServices';
import { sendEmail } from '../services/mailgunServices';
import DOMPurify from 'dompurify'; // For sanitizing HTML content, if needed

// Function to escape user input (if needed for custom scenarios)
const escapeHTML = (str: string) => {
    return str.replace(/[&<>"']/g, (match) => {
        const escapeMap: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return escapeMap[match];
    });
};

const FormComponent: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateField = (value: string, validator: (value: string) => string | true, fieldName: string) => {
        const result = validator(value);
        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: result === true ? '' : result
        }));
    };

    

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const nameError = validName(name);
        const emailError = validEmail(email);
        const cardError = validCreditCard(cardNumber);

        if (nameError === true && emailError === true && cardError === true) {
            // Escape user inputs before sending
            const escapedName = escapeHTML(name);
            const escapedEmail = escapeHTML(email);
            const escapedCardNumber = escapeHTML(cardNumber);

            const formData = new FormData();
            formData.append('name', escapedName);
            formData.append('email', escapedEmail);
            formData.append('cardNumber', escapedCardNumber);

            postForm(formData)
                .then(response => {
                    if (response.ok) {
                        alert('Form submitted successfully');
                        sendEmail(formData);
                    } else {
                        alert('Form submission failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Form submission failed');
                });

           
        } else {
            setErrors({
                name: nameError === true ? '' : nameError as string,
                email: emailError === true ? '' : emailError as string,
                cardNumber: cardError === true ? '' : cardError as string
            });
        }
    };


    return (
        <>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="error-messages">
                <ul>
                    <li>{errors.name}</li>
                    <li>{errors.email}</li>
                    <li>{errors.cardNumber}</li>
                </ul>
            </div>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        validateField(e.target.value, validName, 'name');
                    }}
                    className={`formInput ${errors.name ? 'invalid' : 'valid'}`}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateField(e.target.value, validEmail, 'email');
                    }}
                    className={`formInput ${errors.email ? 'invalid' : 'valid'}`}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cardNumber">Card:</label>
                <input
                    placeholder="Enter a Proxy Credit Card Number."
                    id="cardNumber"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={(e) => {
                        setCardNumber(e.target.value);
                        validateField(e.target.value, validCreditCard, 'cardNumber');
                    }}
                    className={`formInput ${errors.cardNumber ? 'invalid' : 'valid'}`}
                />
            </div>
            <button type="submit" className="submit-btn">Submit</button>
        </form>
        </div>
        </>
    );
};

export default FormComponent;
