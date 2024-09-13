export const validName = (name: string): string | true => {
    const message = 'Please enter a valid name';
    const allowedChars = /^[a-zA-Z ]+$/;
    if (!name) return message;
    if (name.length < 3 || name.length > 50) return message;
    if (!allowedChars.test(name)) return message;
    return true;
};

export const validEmail = (email: string): string | true => {
    const message = 'Please enter a valid email address';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return message;

    if (!emailRegex.test(email)) return message;

    const domainParts = email.split('@')[1]?.split('.');
    if (domainParts?.length < 2) return message;

    //tld =  .com/.org/.net/etc.
    const tld = domainParts[domainParts.length - 1];   
    const tldRegex = /^[a-zA-Z]{2,}$/; 
    if (tld.length > 10 || !tldRegex.test(tld)) return message;


    return true;
};

export const validCreditCard = (cardNumber: string): string | true => {
    const message = 'Please enter a valid credit card number';
    const allowedChars = /^\d{16}$/;
    if (!cardNumber) return message;
    if (!allowedChars.test(cardNumber)) return message;
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
