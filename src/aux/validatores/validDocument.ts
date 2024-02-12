export function validDocument(document: string | undefined) {
  if (document === '') return false;
  if (!document) return true;
  if (typeof document !== 'string') return false;
  return true;
}
