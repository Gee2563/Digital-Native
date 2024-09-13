export const validName = (name: string): string | boolean => {
    const message = 'Please enter a valid name';
    if (!name) return message;
    if (name.length < 3 || name.length >= 44) return message;
    if (/\d/.test(name)) return message;
    if (!/^[a-zA-Z ]+$/.test(name)) return message;
    return true;
};

export const validEmail = (email: string): string | boolean => {
    const message = 'Please enter a valid email address';
    if (!email) return message;
    const emailParts = email.split('@');
    if (emailParts.length !== 2) return message;
    const [localPart, domain] = emailParts;
    if (localPart.length < 1 || domain.length < 3 || !domain.includes('.') || domain[0] === '.') return message;
    return true;
};

export const validCreditCard = (cardNumber: string): string | boolean => {
    const message = 'Please enter a valid credit card number';
    if (!cardNumber) return message;
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) return message;
    
    // Check credit card number with Luhn's algorithm
    const digits = cardNumber.split('').map(Number);
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    if (sum % 10 !== 0) return message;
    return true;
};
