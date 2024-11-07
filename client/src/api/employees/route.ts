import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'employees.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);

    console.log('API: Employees data loaded:', data);

    // Check if the data has the expected structure
    if (!data.employees || !Array.isArray(data.employees) || data.employees.length === 0) {
      throw new Error('Invalid data structure');
    }

    // Return the employees array directly
    return NextResponse.json({ employees: data.employees });
  } catch (error) {
    console.error('API: Error loading employees data:', error);
    return NextResponse.json({ error: 'Failed to load employees data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newEmployee = await request.json();
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    
    // Add the new employee to the appropriate place in the hierarchy
    // This is a simplified version; you may need to implement a more complex logic
    // to add the employee to the correct position in the hierarchy
    jsonData.employees.subordinates.push(newEmployee);

    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
    return NextResponse.json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error('API: Error adding employee:', error);
    return NextResponse.json({ error: 'Failed to add employee' }, { status: 500 });
  }
}
