import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { Readable } from 'stream';



const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: '1234', // Ensure the API key is correctly set
});

export const sendEmail = async (form: FormData) => {
    const text = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nCard number: ${form.get('cardNumber')}`;
  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: process.env.YOUREMAIL, // Change this to your Mailgun verified email
      to: "test@dn-uk.com",
      subject:"New form submission",
      text: text,
    }); 
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

