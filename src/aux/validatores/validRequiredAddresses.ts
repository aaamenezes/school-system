import { Address } from '../../entities';

function validAddress(address: Address) {
  if (!('street' in address)) return false;
  if (!('number' in address)) return false;
  if (!('city' in address)) return false;

  if (typeof address.street !== 'string') return false;
  if (typeof address.number !== 'number') return false;
  if (typeof address.city !== 'string') return false;

  if (address.street === '') return false;
  if (address.number < 1) return false;
  if (address.city === '') return false;

  return true;
}

export function validRequiredAddresses(addresses: Address[]) {
  if (!addresses) return false;
  if (!Array.isArray(addresses)) return false;
  if (addresses.length === 0) return false;

  const addressesIsValid = addresses.every(validAddress);

  return addressesIsValid;
}
