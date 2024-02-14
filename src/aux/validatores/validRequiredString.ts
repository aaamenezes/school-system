export function validRequiredString(string: string) {
  if (!string) return false;
  if (typeof string !== 'string') return false;
  if (string === '') return false;
  return true;
}
