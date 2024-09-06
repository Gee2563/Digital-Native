import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormComponent from '../components/FormComponent'

describe('FormComponent', () => {
  test('renders form and its elements', () => {
    render(<FormComponent />);
    
    // Check if form and its elements are rendered
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/card/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('displays error message for invalid name input', () => {
    render(<FormComponent />);
    
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John123' } });
    
    const nameError = screen.getByText(/Please enter a valid name/i);
    expect(nameError).toBeInTheDocument();
  });
  
  test('displays error message for invalid email input', () => {
    render(<FormComponent />);
    
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const emailError = screen.getByText(/Please enter a valid email/i);
    expect(emailError).toBeInTheDocument();
  });

  test('displays error message for invalid card number input', () => {
    render(<FormComponent />);
    
    const cardInput = screen.getByLabelText(/card/i) as HTMLInputElement;
    fireEvent.change(cardInput, { target: { value: '1234' } });
    
    const cardError = screen.getByText(/Please enter a valid credit card number/i);
    expect(cardError).toBeInTheDocument();
  });


  test('does not display error message for valid name input', () => {
    render(<FormComponent />);
    
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    const nameError = screen.queryByText(/Please enter a valid name/i);
    expect(nameError).not.toBeInTheDocument();
  });

  test('does not display error message for valid email input', () => {
    render(<FormComponent />);
    
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'email123@gmail.com' } });

    const emailError = screen.queryByText(/Please enter a valid email/i);
    expect(emailError).not.toBeInTheDocument();

  });

  test('does not display error message for valid card number input', () => {
    render(<FormComponent />);
    
    const cardInput = screen.getByLabelText(/card/i) as HTMLInputElement;
    fireEvent.change(cardInput, { target: { value: '4111111111111111' } });
    
    const cardError = screen.queryByText(/Please enter a valid credit card number/i);
    expect(cardError).not.toBeInTheDocument();
  });

  // mock the fetch API 
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  test('submits form data', async () => {
    render(<FormComponent />);
    
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const cardInput = screen.getByLabelText(/card/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'joh@doe.com' } });
    fireEvent.change(cardInput, { target: { value: '4111111111111111' } });

    mockFetch.mockResolvedValueOnce({ status: 200 });
    fireEvent.click(submitButton);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    // expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/form', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: 'John Doe',
    //     email: '
    //     cardNumber: '411111111111
    //   }),
    // });
    
   
    })
  });
  

