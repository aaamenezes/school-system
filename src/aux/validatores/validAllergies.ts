import { Allergies } from '../../entities';

export function validAllergies(allergies: Allergies | undefined) {
  if (!allergies) return true;
  if (!Array.isArray(allergies)) return false;
  if (!allergies.every(allergy => typeof allergy === 'string')) return false;
  return true;
}
