// api/children/types.ts
import { Prisma } from '@prisma/client';

// Define the type for a member as returned by Prisma
export type Member = Prisma.UserGetPayload<{
  select: {
    id: true;
    first_name: true;
    last_name: true;
    birth_date: true;
    createdAt: true;
    email: true;
    phone_number: true;
    role: true;
    membership_status: true;
    dues_paid: true;
    isSubscribed: true;
    isOnboarded: true;
    middle_name: true;
    picture: true;
    address: true;
    customerId: true;
    updatedBy: true;
  };
}>;

// Define the type for the response from the GET request
export type GetMembersResponseType = Member[]; // An array of Member objects

// Define the type for the response from the GET request for a single Member
export type GetSingleMemberResponseType = Member; // A single Child object

// Define the type for the request body for DELETE requests
export type DeleteMembersRequestBody = {
  memberIds: string[];
};


// Define the type for updating member details
export type MemberUpdateData = Partial<Omit<Member, 'createdAt'>>; // Exclude createdAt from updatable fields
