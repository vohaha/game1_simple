export interface ISerializable<T> {
  serialize(): string;
  deserialize(): T;
}
