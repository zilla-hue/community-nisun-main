// api/children/types.ts
import { Prisma } from '@prisma/client';

// Define the type for a child as returned by Prisma
export type Child = Prisma.ChildGetPayload<{
  select: {
    id: true;
    first_name: true;
    last_name: true;
    birth_date: true;
    createdAt: true;
  };
}>;

// Define the type for the response from the GET request
export type GetChildrenResponseType = Child[]; // An array of Child objects

// Define the type for the response from the GET request for a single child
export type GetSingleChildResponseType = Child; // A single Child object

// Define the type for the request body for DELETE requests
export type DeleteChildrenRequestBody = {
  childIds: string[];
};
