import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createGameEngine } from '../core/gameEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '../');

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Game engine context
const gameEngine = await createGameEngine();
await gameEngine.start();

// Routes
app.get('/', (req, res) => {
  const individuals = gameEngine.getContext().entityRegistry.getAllByType('individual');
  res.render('index', { individuals });
});

app.post('/individual/create', (req, res) => {
  const name = req.body.name || 'Anon';
  const ind = gameEngine.createIndividual();
  ind.name = name;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`✅ Game1 Dev Server running at http://localhost:${port}`);
});
