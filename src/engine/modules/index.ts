import { v4 } from 'uuid';
import { IndividualAggregate } from './individual/src/individual.aggregate';

const player1 = IndividualAggregate.create(v4(), 'vh');
const player2 = IndividualAggregate.create(v4(), 'an');

player1.startSleep();
player2.startSleep();
