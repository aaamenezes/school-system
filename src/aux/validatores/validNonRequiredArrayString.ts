export function validNonRequiredArrayString<T>(dataArr: T | undefined) {
  if (!dataArr) return true;
  if (!Array.isArray(dataArr)) return false;
  if (!dataArr.every(data => typeof data === 'string')) return false;
  return true;
}
