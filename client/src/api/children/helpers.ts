// api/children/helpers.ts
import { GetChildrenResponseType, GetSingleChildResponseType, DeleteChildrenRequestBody } from './types';

// Helper function for bulk deletion of children
export const deleteChildren = async (childIds: string[]): Promise<GetChildrenResponseType> => {
  const response = await fetch('/api/children', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ childIds }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete children');
  }

  return response.json();
};

// Helper function for single deletion of a child
export const deleteSingleChild = async (childId: string): Promise<GetSingleChildResponseType> => {
  const response = await fetch(`/api/children?childId=${childId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete child');
  }

  return response.json();
};
