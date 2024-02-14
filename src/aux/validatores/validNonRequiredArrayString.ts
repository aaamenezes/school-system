export function validNonRequiredArrayString<T>(dataArr: T | undefined) {
  if (!dataArr) return true;
  if (!Array.isArray(dataArr)) return false;
  if (dataArr.length === 0) return false;
  if (dataArr.some(data => typeof data !== 'string')) return false;
  return true;
}
