import { AbstractValueObject } from '@core/ddd';

// TODO: Define properties for identity, e.g., a unique key or name.
export interface IdentityProps {
  key: string;
}

/**
 * Represents the Identity of an individual as a Value Object.
 * It is immutable and identified by its properties.
 */
export class Identity extends AbstractValueObject<IdentityProps> {
  private constructor(props: IdentityProps) {
    super(props);
  }

  /**
   * Factory method to create a new Identity.
   * @param props The properties of the identity.
   * @returns A new Identity instance.
   */
  public static create(props: IdentityProps): Identity {
    // TODO: Add validation for the identity properties.
    return new Identity(props);
  }
}
