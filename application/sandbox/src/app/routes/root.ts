import { FastifyInstance } from 'fastify';
import { IndividualFactory } from '@game1/individual';

const indiv = IndividualFactory.create({
  name: 'vh',
});

setInterval(() => {
  indiv.energy.spend(+1);
}, 100);

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    console.log('energy = ', indiv.energy.value);
    return { message: `${indiv.energy.value} vohaha` };
  });
}
