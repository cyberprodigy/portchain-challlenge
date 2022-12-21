// Description: Converts a string to a date if it is a string
export function convertToDateIfString(value: string | Date): Date {
  if (typeof value === 'string') {
    return new Date(value);
  }

  return value;
}
