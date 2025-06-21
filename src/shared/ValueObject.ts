/**
 * Base interface for Value Objects in the Game1 domain.
 * Ensures consistent value semantics for comparison, immutability, and context-wide use.
 *
 * All bounded contexts should prefer extending or implementing this interface
 * for their "ValueObject" types (e.g., IndividualTraitVO, EnergyValueObject).
 */
export interface ValueObject<T> {
  /**
   * Equality check based on value, not reference or identity.
   * Should return true for any two value objects of the same type & data.
   */
  equals(other: T): boolean;
}
