import { Entity } from '@game1/types';

export class Product extends Entity {
  constructor(input: { id?: unknown }) {
    super(input.id);
  }
}
