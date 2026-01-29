import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DenialChart from '../components/DenialChart.tsx';
import TranslucentTable from '../components/TranslucentTable.tsx';
import TranslucentDropdown from '../components/TranslucentDropdown.tsx';

class ResizeObserver {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
(global as any).ResizeObserver = ResizeObserver;

const chartData = [
  { department: 'Department A', count: 10 },
  { department: 'Department B', count: 20 },
  { department: 'Department C', count: 30 },
  { department: 'Department D', count: 40 },
];

const tableData = [
  {
    id: "D00000",
    department: "Radiology",
    amount: 2707.05,
    reason: "Expired coverage",
    date: "2024-09-13",
    payer: "Medicare"
  },
  {
    id: "D00001",
    department: "Orthopedics",
    amount: 634.63,
    reason: "Expired coverage",
    date: "2024-12-22",
    payer: "Humana"
  },
  {
    id: "D00002",
    department: "Oncology",
    amount: 1456.29,
    reason: "Authorization missing",
    date: "2025-02-27",
    payer: "Cigna"
  },
  {
    id: "D00003",
    department: "Radiology",
    amount: 2479.85,
    reason: "Missing info",
    date: "2024-11-18",
    payer: "Medicare"
  },  
];

test('renders chart title', () => {
  render(<DenialChart data={chartData} selectedDepartment={null} />);
  const title = screen.getByText(/Denial Charts/i); // or /Denial Breakdown/i
  expect(title).toBeInTheDocument();
});

describe('tests for department dropdown', () => {
  const departments = Array.from(new Set(tableData.map(d => d.department)));

  test('renders department dropdown', () => {
    render(<TranslucentDropdown data={departments} selectedDepartment={null} />);
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
  });

  test('renders default option', () => {
    render(<TranslucentDropdown data={departments} selectedDepartment={null} />);
    const allOption = screen.getByRole("option", { name: /All Departments/i });
    expect(allOption).toBeInTheDocument();
  });

  test('renders specific option', () => {
    render(<TranslucentDropdown data={departments} selectedDepartment={null} />);
    const dropdown = screen.getByRole("combobox");

    fireEvent.click(dropdown);

    const radiologyOption = screen.getByRole("option", { name: "Radiology" });
    expect(radiologyOption).toBeInTheDocument();
    expect((radiologyOption as HTMLOptionElement).value).toBe("Radiology");
  });

  test('renders filtered table data when department is selected', () => {
    const dataWithDenials = { denials: tableData };

    render(
      <TranslucentTable
        data={dataWithDenials}
        selectedDepartment="Radiology"
        onDepartmentChange={jest.fn()}
      />
    );

    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody tr');

    // Only the two Radiology rows should be rendered
    expect(rows.length).toBe(2);

    rows.forEach((row) => {
      // Dept column is the second cell
      expect(row.cells[1].textContent).toBe('Radiology');
    });
  });
});
