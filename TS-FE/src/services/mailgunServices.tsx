import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { Readable } from 'stream';



//create a new instance of mailgun and add the user and api key
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: '1234', 
});

// format the email and send it
export const sendEmail = async (form: FormData) => {
    const text = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nCard number: ${form.get('cardNumber')}`;
  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: process.env.YOUREMAIL,
      to: "test@dn-uk.com",
      subject:"New form submission",
      text: text,
    }); 
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

