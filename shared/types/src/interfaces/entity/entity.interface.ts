export interface IEntity<TValue extends string = string> {
  readonly id: TValue;
  equals(otherId: unknown): boolean;
}
