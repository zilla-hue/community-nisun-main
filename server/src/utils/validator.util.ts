export const validateBooleanField = (field: any, fieldName: string): void => {
  if (typeof field === 'string') {
    if (field.toLowerCase() === 'true') {
      field = true;
    } else if (field.toLowerCase() === 'false') {
      field = false;
    } else {
      throw new Error(`${fieldName} must be a boolean value`);
    }
  }

  if (typeof field !== 'boolean') {
    throw new Error(`${fieldName} must be a boolean value`);
  }
};
