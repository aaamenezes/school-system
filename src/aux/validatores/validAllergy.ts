import { Allergy } from '../../entities';

export function validAllergy(allergy: Allergy | undefined) {
  if (!allergy) return false;
  if (!Array.isArray(allergy)) return false;
  if (!allergy.every(allergy => typeof allergy === 'string')) return false;
  return true;
}
