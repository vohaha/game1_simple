import fs from 'fs';
import path from 'path';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { ApplicationService, eventLog } from './sandbox';
import { IndividualTraitVO } from './individual/IndividualTraitVO';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
const cwd = process.cwd();
const srcViewsPath = path.resolve(cwd, 'src', 'views');
const distViewsPath = path.resolve(cwd, 'dist', 'views');
console.log('[Game1][View Path Diagnosis]');
console.log('process.cwd():', cwd);
console.log('srcViewsPath:', srcViewsPath);
console.log('distViewsPath:', distViewsPath);
console.log('srcViewsPath exists:', fs.existsSync(srcViewsPath));
console.log('distViewsPath exists:', fs.existsSync(distViewsPath));
if (fs.existsSync(srcViewsPath)) {
  app.set('views', srcViewsPath);
} else if (fs.existsSync(distViewsPath)) {
  app.set('views', distViewsPath);
} else {
  console.error('[Game1][Startup Error] Neither src/views nor dist/views found.');
  throw new Error('Views directory not found: checked src/views and dist/views.');
}
app.use(express.static(path.join(cwd, 'public')));

// Request logging (can upgrade to middleware/logger for production)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/individual/:id', (req, res) => {});

app.get('/htmx/individual/:id/state', (req, res) => {});

const indiv = ApplicationService.registerIndividual('1', 'vh', [
  new IndividualTraitVO('leadership', 8, 'personality'),
]);

app.get('/', (req, res) => {
  res.send(`
    <h2>Game1 Sandbox Server</h2>
    ${JSON.stringify(indiv.individual.getSnapshot())}
  `);
});

app.listen(PORT, () => {
  console.log(`Sandbox server listening on http://localhost:${PORT}`);
});
