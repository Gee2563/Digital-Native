export const postSubmitForm = async (data) => {
    // if you need a token to be sent with the request
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await fetch('your.backend.url', {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to submit form');
        }
    }
    catch (error) {
        console.error('Error submitting form', error);
    }
};
