export abstract class SharedSerializable<T> {
  serialize(): string {
    return JSON.stringify(this);
  }
  abstract deserialize(): T;
}
