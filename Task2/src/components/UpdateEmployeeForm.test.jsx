import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateEmployeeForm from './UpdateEmployeeForm';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('UpdateEmployeeForm', () => {
  const mockSetEmployees = jest.fn();
  const employee = {
    id: 1,
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane@example.com',
    department: 'Marketing',
    salary: '60000',
    isManager: false,
    manager: '',
  };
  const employees = [employee];

  beforeEach(() => {
    mockSetEmployees.mockClear();
  });

  test('renders form inputs with employee data', () => {
    renderWithRouter(<UpdateEmployeeForm employee={employee} employees={employees} setEmployees={mockSetEmployees} />);
    expect(screen.getByLabelText(/First Name/i).value).toBe('Jane');
    expect(screen.getByLabelText(/Last Name/i).value).toBe('Doe');
    expect(screen.getByLabelText(/Email/i).value).toBe('jane@example.com');
    expect(screen.getByLabelText(/Department/i).value).toBe('Marketing');
    expect(screen.getByLabelText(/Salary/i).value).toBe('60000');
    expect(screen.getByLabelText(/Is this employee a manager/i).checked).toBe(false);
  });

  test('updates input values on change', () => {
    renderWithRouter(<UpdateEmployeeForm employee={employee} employees={employees} setEmployees={mockSetEmployees} />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'Janet' } });
    expect(firstNameInput.value).toBe('Janet');
  });

  test('calls setEmployees on submit with updated employee', () => {
    renderWithRouter(<UpdateEmployeeForm employee={employee} employees={employees} setEmployees={mockSetEmployees} />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Janet' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockSetEmployees).toHaveBeenCalledTimes(1);
    const updatedEmployees = mockSetEmployees.mock.calls[0][0];
    expect(updatedEmployees.length).toBe(1);
    expect(updatedEmployees[0].firstname).toBe('Janet');
  });
});
