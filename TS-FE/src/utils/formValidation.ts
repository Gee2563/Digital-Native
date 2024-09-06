export const validName = (name: string): string | true => {
    const message = 'Please enter a valid name';
    if (!name) return message;
    if (name.length < 3 || name.length > 50) return message;
    if (/\d/.test(name)) return message;
    if (!/^[a-zA-Z ]+$/.test(name)) return message;
    return true;
};

export const validEmail = (email: string): string | true => {
    const message = 'Please enter a valid email address';
    if (!email) return message;
    const emailParts = email.split('@');
    if (emailParts.length !== 2) return message;
    const [localPart, domain] = emailParts;
    if (localPart.length < 1 || domain.length < 3) return message;
    if (!domain.includes('.') || domain[0] === '.') return message;
    return true;
};

export const validCreditCard = (cardNumber: string): string | true => {
    const message = 'Please enter a valid credit card number';
    if (!cardNumber || cardNumber.length !== 16) return message;
    if (!/^\d+$/.test(cardNumber)) return message;
    const digits = cardNumber.split('').map(Number);
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0 ? true : message;
};
