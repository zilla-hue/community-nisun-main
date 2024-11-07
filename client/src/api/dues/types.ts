import { Prisma } from '@prisma/client';

// Define the type for a due as returned by Prisma
export type Dues = Prisma.DuesGetPayload<{
  select: {
    id: true;
    name: true;
    price: true;
    isArchived: boolean;
  };
}>;

// Define the type for the response from the GET request
export type GetDuesResponseType = Dues[]; // An array of Dues objects

// Define the type for the response from the GET request for a single due
export type GetSingleDueResponseType = Dues; // A single Dues object

// Define the type for the request body for DELETE requests
export type DeleteDuesRequestBody = {
  duesIds: string[];
};
