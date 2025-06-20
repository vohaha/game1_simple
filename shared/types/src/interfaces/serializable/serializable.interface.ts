export interface ISerializable<T extends object = object> {
  serialize(): string;
  deserialize(data: string): T | Error;
}
