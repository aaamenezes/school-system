import { SerializableStatic } from '../types.js';
import { DomainError } from './DomainError.js';

export class DependencyConflictError extends DomainError {
  constructor(
    parentClass: SerializableStatic,
    deependency: SerializableStatic,
    locator: any
  ) {
    super(
      `${parentClass.name} with locator ${JSON.stringify(
        locator
      )} cannot be removed because ${deependency.name} has depencencies to it.`,
      parentClass,
      { code: 'DEPENDENCY_LOCK', status: 403 }
    );
  }
}
