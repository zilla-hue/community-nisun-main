// api/children/helpers.ts
import { GetMembersResponseType, GetSingleMemberResponseType, DeleteMembersRequestBody } from './types';

// Helper function for bulk deletion of members
export const deleteMembers = async (memberIds: string[]): Promise<GetMembersResponseType> => {
  const response = await fetch('/api/members', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ memberIds }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete members');
  }

  return response.json();
};

// Helper function for single deletion of a member
export const deleteSingleMember = async (memberId: string): Promise<GetSingleMemberResponseType> => {
  const response = await fetch(`/api/members?memberId=${memberId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete member');
  }

  return response.json();
};
