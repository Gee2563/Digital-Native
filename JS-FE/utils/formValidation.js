export const validName = (name) => {
    const message = 'Please enter a valid name';
    if (!name) return message;
    if (name.length < 3) return message;
    if (name.length > 50) return message;
    // if name contains any number, return false
    if (/\d/.test(name)) return message;
    // if name contains any special character, return false
    if (!/^[a-zA-Z ]+$/.test(name)) return message;
    return true;

};

export const validEmail = (email) => {
    const message = 'Please enter a valid email address';
    if (!email) return message
    const emailParts = email.split('@');
    if (emailParts.length !== 2) return message;
    const [localPart, domain] = emailParts;
    if (localPart.length < 1) return message;
    if (domain.length < 3) return message;
    if (!domain.includes('.')) return message;
    if (domain[0] === '.') return message;
    return true;
}

export const validCreditCard = (cardNumber) => {
    const message = 'Please enter a valid credit card number';
    if (!cardNumber) return message;
    if (cardNumber.length !== 16) return message;
    //check if cardNumber contains any non-digit character
    if (!/^\d+$/.test(cardNumber)) return message;
    // check cardNumber passs Luhn's algorithm
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
}

