export interface ISerializable<T extends object = object> {
  serialize(entity: T): string;
  deserialize(data: string): T | Error;
}
