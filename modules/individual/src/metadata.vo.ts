import { AbstractValueObject } from '@core/ddd';

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
    return new Metadata(props);
  }
}
