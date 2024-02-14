export function validRequiredArrayString(dataArr: string[] | undefined) {
  if (!dataArr) return false;
  if (!Array.isArray(dataArr)) return false;
  if (dataArr.length === 0) return false;
  if (dataArr.some((data: unknown) => typeof data !== 'string')) return false;
  return true;
}
