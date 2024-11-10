import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      isPatient: true,
      profile: {
        id: 1,
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        dob: '1990-01-01',
        phoneNo: '1234567890',
        address: '123 Main St',
        password: 'password',
        age: '30',
        email: 'john.doe@example.com',
      },
    },
  }),
}));

describe('Profile Component', () => {
  test('renders HeaderSection correctly', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(screen.getByText('MediTech HealthCare')).toBeInTheDocument();
  });

  test('renders FormComponent correctly', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect((screen.getByLabelText('First Name') as HTMLInputElement)).toBeInTheDocument();
    expect((screen.getByLabelText('Middle Name') as HTMLInputElement)).toBeInTheDocument();
    expect((screen.getByLabelText('Last Name') as HTMLInputElement)).toBeInTheDocument();
    expect((screen.getByLabelText('DOB') as HTMLInputElement)).toBeInTheDocument();
    expect((screen.getByLabelText('Phone') as HTMLInputElement)).toBeInTheDocument();
    expect((screen.getByLabelText('Age') as HTMLInputElement)).toBeInTheDocument();
    expect((screen.getByLabelText('Address') as HTMLInputElement)).toBeInTheDocument();
    expect((screen.getByLabelText('Email') as HTMLInputElement)).toBeInTheDocument();
    expect((screen.getByLabelText('Password') as HTMLInputElement)).toBeInTheDocument();
  });

  test('form submission works correctly', async () => {
    (axios.patch as jest.Mock).mockResolvedValue({ status: 200, data: { id: 1 } });

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '0987654321' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '456 Another St' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'newpassword' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new.email@example.com' } });

    fireEvent.click(screen.getByText('Update'));

    expect(axios.patch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/patient/1`,
      {
        phoneNo: '0987654321',
        address: '456 Another St',
        password: 'newpassword',
        email: 'new.email@example.com',
      }
    );

    expect(mockNavigate).toHaveBeenCalledWith('/patient', { state: { id: 1 } });
  });

  test('form fields change correctly', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '0987654321' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '456 Another St' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'newpassword' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new.email@example.com' } });

    expect((screen.getByLabelText('Phone') as HTMLInputElement).value).toBe('0987654321');
    expect((screen.getByLabelText('Address') as HTMLInputElement).value).toBe('456 Another St');
    expect((screen.getByLabelText('Password') as HTMLInputElement).value).toBe('newpassword');
    expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe('new.email@example.com');
  });
});