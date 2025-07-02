import { v4 as uuidv4 } from 'uuid';
import Fastify from 'fastify';
import { engine } from '../engine';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', async (request, reply) => {
  const player = engine.createPlayer(uuidv4(), 'vohaha');
  return player.snapshot;
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
