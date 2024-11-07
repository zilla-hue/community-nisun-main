// api/dues/helpers.ts
import { GetDuesResponseType, GetSingleDueResponseType, DeleteDuesRequestBody } from './types';

// Helper function for bulk deletion of dues
export const deleteDues = async (duesIds: string[]): Promise<GetDuesResponseType> => {
  const response = await fetch('/api/dues', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ duesIds }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete dues');
  }

  return response.json();
};

// Helper function for single deletion of a due
export const deleteSingleDue = async (dues: string): Promise<GetDuesResponseType> => {
  const response = await fetch(`/api/dues?duesId=${dues}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete due');
  }

  return response.json();
};
