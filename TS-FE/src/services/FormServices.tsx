
import * as emailjs from 'emailjs-com';

export const postForm = async (formData: FormData): Promise<Response> => {
// if auth token is needed:
const token = localStorage.getItem('token');
const url = 'http://localhost:3001/form';

try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });
    return response;


} catch (error) {
    console.error('Error:', error);
    return error as Response;
}
}


export const sendEmail = (formData: { [key: string]: string }) => {
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID!;
    const userID = process.env.REACT_APP_EMAILJS_USER_ID!;
  
    return emailjs.send(serviceID, templateID, formData, userID)
      .then((response: emailjs.EmailJSResponseStatus) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error: any) => {
        console.error('Failed to send email:', error);
      });
  };