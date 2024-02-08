import { Medicines } from '../../entities';

export function validMedicines(medicines: Medicines | undefined) {
  if (!medicines) return true;
  if (!Array.isArray(medicines)) return false;
  if (!medicines.every(medicine => typeof medicine === 'string')) return false;
  return true;
}
