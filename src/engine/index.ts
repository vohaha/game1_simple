import { IndividualAggregate } from './modules';

export const engine = {
  createPlayer(id: string, name: string) {
    return IndividualAggregate.create(id, name);
  },
};
