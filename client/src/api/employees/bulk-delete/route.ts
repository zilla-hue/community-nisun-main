import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();

    const filePath = path.join(process.cwd(), 'public', 'data', 'employees.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    let employees = JSON.parse(fileContent);

    // Recursive function to remove employees and their subordinates
    const removeEmployee = (emp: any) => {
      if (ids.includes(emp.id)) {
        return null;
      }
      if (emp.subordinates) {
        emp.subordinates = emp.subordinates.filter((sub: any) => removeEmployee(sub) !== null);
      }
      return emp;
    };

    employees = removeEmployee(employees);

    await fs.writeFile(filePath, JSON.stringify(employees, null, 2));

    return NextResponse.json({ message: 'Employees deleted successfully' });
  } catch (error) {
    console.error('Error deleting employees:', error);
    return NextResponse.json({ error: 'Failed to delete employees' }, { status: 500 });
  }
}
