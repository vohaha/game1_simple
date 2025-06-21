import { FastifyInstance } from 'fastify';
import { IndividualFactory } from '@game1/individual';

const indiv = IndividualFactory.create({
  name: 'vh',
  energy: 100,
});

setInterval(() => {
  indiv.performAction('show_focus', 'defaultFocus');
}, 100);

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return {
      message: indiv.isTired() ? 'vohaha tired' : 'vohaha fine',
      energy: indiv.energy,
    };
  });
}
