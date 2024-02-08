import { Blood } from '../../entities';

export function validBlood(blood: Blood | undefined) {
  if (!blood) return false;
  if (!Array.isArray(blood)) return false;
  if (!blood.every(blood => typeof blood === 'string')) return false;
  return true;
}
