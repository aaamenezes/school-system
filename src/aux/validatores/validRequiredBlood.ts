import { Blood } from '../../entities';

const validBloods = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export function validRequiredBlood(blood: Blood | undefined) {
  if (!blood) return false;
  if (typeof blood !== 'string') return false;
  if (!validBloods.includes(blood)) return false;
  return true;
}
