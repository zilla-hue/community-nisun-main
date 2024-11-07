import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'employees.json');

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updatedEmployee = await request.json();
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Update the employee in the hierarchy
    // This is a simplified version; you may need to implement a more complex logic
    // to update the employee at the correct position in the hierarchy
    const updateEmployee = (employees: any) => {
      if (employees.id === id) {
        return { ...employees, ...updatedEmployee };
      }
      if (employees.subordinates) {
        employees.subordinates = employees.subordinates.map(updateEmployee);
      }
      return employees;
    };

    jsonData.employees = updateEmployee(jsonData.employees);

    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
    return NextResponse.json({ message: 'Employee updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Remove the employee from the hierarchy
    // This is a simplified version; you may need to implement a more complex logic
    // to remove the employee from the correct position in the hierarchy
    const removeEmployee = (employees: any) => {
      if (employees.subordinates) {
        employees.subordinates = employees.subordinates.filter((e: any) => e.id !== id);
        employees.subordinates.forEach((e: any) => removeEmployee(e));
      }
      return employees;
    };

    jsonData.employees = removeEmployee(jsonData.employees);

    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
    return NextResponse.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
  }
}
