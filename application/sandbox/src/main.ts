import { Individual } from '@game1/individual';

const indiv = new Individual({
  name: 'vh',
  energy: 100,
});

console.log(indiv.energy.value);
indiv.performAction();
console.log(indiv.energy.value);
indiv.performAction();
console.log(indiv.energy.value);
