import React, { useState, useEffect} from 'react';
import { validName, validEmail, validCreditCard } from '../utils/formValidation';
import { postForm } from '../services/FormServices';
import { sendEmail } from '../services/mailgunServices';


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

    useEffect(() => {
        validateField(name, validName, 'name');

    }, [name]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const nameError = validName(name);
        const emailError = validEmail(email);
        const cardError = validCreditCard(cardNumber);

        if (nameError === true && emailError === true && cardError === true) {
            // Submit form logic
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('cardNumber', cardNumber);
            postForm(formData)
                .then(response => {
                    if (response.ok) {
                        alert('Form submitted successfully');
                    } else {
                        alert('Form submission failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Form submission failed');
                });
            sendEmail(formData);


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
