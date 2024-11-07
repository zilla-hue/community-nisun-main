import { Employee } from '@/types/employee';

const defaultEmployees = {
  employees: [
    {
      name: "Olivia Evelyn",
      role: "CEO/President",
      image: "/api/placeholder/64/64",
      subordinates: [
        {
          id: "1",
          name: "Maverick Ross",
          role: "Executive",
          image: "/api/placeholder/48/48",
          subordinates: []
        },
        {
          id: "3",
          name: "Matthew James",
          role: "Executive",
          image: "/api/placeholder/48/48",
          subordinates: [
            {
              id: "31",
              name: "Luke Hobson",
              role: "Team Member",
              image: "/api/placeholder/48/48",
              subordinates: []
            },
            {
              id: "32",
              name: "David Elias",
              role: "Team Member",
              image: "/api/placeholder/48/48",
              subordinates: []
            }
          ]
        }
      ]
    }
  ]
};

export const saveEmployees = async (employees: Employee[]) => {
  try {
    localStorage.setItem('employees', JSON.stringify({ employees }));
    return { success: true };
  } catch (error) {
    console.error('Error saving employees:', error);
    throw error;
  }
};

export const fetchEmployees = async () => {
  try {
    const storedData = localStorage.getItem('employees');
    if (storedData) {
      return JSON.parse(storedData);
    }
    // If no data in localStorage, save and return default data
    await saveEmployees(defaultEmployees.employees);
    return defaultEmployees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return defaultEmployees; // Return default data if there's an error
  }
};
