export function validNonRequiredString(data: string | undefined) {
  if (!data) return true;
  if (typeof data !== 'string') return false;
  if (data === '') return false;
  return true;
}
