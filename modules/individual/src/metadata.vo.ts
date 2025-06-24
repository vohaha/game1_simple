import { AbstractValueObject, DomainError } from '@core/ddd';

export interface IMetadata {
  name: string;
}

export class Metadata extends AbstractValueObject<IMetadata> {
  get name(): string {
    return this.props.name;
  }

  private constructor(props: IMetadata) {
    super(props);
  }

  public static create(props: IMetadata): Metadata {
    if (!props.name?.trim()) {
      throw new MissingIndividualNameError();
    }
    return new Metadata(props);
  }
}

export class MissingIndividualNameError extends DomainError {
  constructor() {
    super('Individual name is required');
  }
}
