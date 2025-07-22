import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeForm from './EmployeeForm';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('EmployeeForm', () => {
  const mockSetEmployees = vi.fn();

  beforeEach(() => {
    mockSetEmployees.mockClear();
  });

  test('renders form inputs', () => {
    renderWithRouter(<EmployeeForm employees={[]} setEmployees={mockSetEmployees} />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Is this employee a manager/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Manager/i)).toBeInTheDocument();
  });

  test('updates input values on change', () => {
    renderWithRouter(<EmployeeForm employees={[]} setEmployees={mockSetEmployees} />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  test('calls setEmployees on submit with new employee', () => {
    renderWithRouter(<EmployeeForm employees={[]} setEmployees={mockSetEmployees} />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Engineering' } });
    fireEvent.change(screen.getByLabelText(/Salary/i), { target: { value: '50000' } });
    fireEvent.click(screen.getByLabelText(/Is this employee a manager/i));
    fireEvent.change(screen.getByLabelText(/Select Manager/i), { target: { value: '' } });

    fireEvent.submit(screen.getByRole('form'));

    expect(mockSetEmployees).toHaveBeenCalledTimes(1);
    const newEmployees = mockSetEmployees.mock.calls[0][0];
    expect(newEmployees.length).toBe(1);
    expect(newEmployees[0].firstname).toBe('John');
    expect(newEmployees[0].lastname).toBe('Doe');
    expect(newEmployees[0].email).toBe('john@example.com');
    expect(newEmployees[0].department).toBe('Engineering');
    expect(newEmployees[0].salary).toBe('50000');
    expect(newEmployees[0].isManager).toBe(true);
  });
});
