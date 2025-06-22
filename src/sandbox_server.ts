import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import { geopoliticalUserflow, eventLog } from './sandbox';

// Aggregates for demo—refreshed on every scenario run
let individualAggregates: Record<string, any> = {};
let groupAggregates: Record<string, any> = {};

// Run domain scenario and snapshot state
function runScenario() {
  // Clear previous events if any (production code may need event store per request/user).
  eventLog.length = 0;
  // Run scenario, extract in-memory aggregates state out of sandbox
  // This mirrors the flow in sandbox.ts: geopoliticalUserflow
  const scenarioExports: any = {};
  // Shim to capture references during geopoliticalUserflow
  const origConsoleLog = console.log;
  try {
    // Patch so we can intercept final state logs
    (global as any).scenarioExports = scenarioExports;
    geopoliticalUserflow();
    // This approach depends on future refactoring to export aggregates from scenario.
    // For now, we reconstruct state from logs/entities.
    // TODO: Replace with proper return value/export in scenario.
    // For demo: create mock aggregates for known leaders/groups (as in scenario code structure)
    const lastLeaders: Record<string, any> = {};
    const lastEnergies: Record<string, any> = {};
    const lastGroups: Record<string, any> = {};
    for (const evt of eventLog) {
      if (evt.event === 'IndividualRegistered') {
        if (!evt.payload || typeof evt.payload !== 'object') continue;
        const id = (evt.payload as any).id;
        // Stash ref to most recent aggregate for this ID
        if ((evt.payload as any).name && id) {
          lastLeaders[id] = {
            id,
            name: (evt.payload as any).name,
            traits: (evt.payload as any).traits,
            snapshot: {
              id,
              name: (evt.payload as any).name,
              traits: ((evt.payload as any).traits || []).map((t: any) => t),
              state: {},
            },
          };
        }
      }
      if (evt.event === 'GroupCreated') {
        // Only basic info available in log snapshot
        if (!evt.payload || typeof evt.payload !== 'object') continue;
        const id = (evt.payload as any).id;
        lastGroups[id] = {
          id,
          name: (evt.payload as any).name,
          members: [],
          snapshot: { id, name: (evt.payload as any).name, members: [] },
        };
      }
    }
    individualAggregates = lastLeaders;
    groupAggregates = lastGroups;
  } finally {
    console.log = origConsoleLog;
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
// Always resolve to src/views in development; fallback to dist/views only if src/views missing
const cwd = process.cwd();
const srcViewsPath = path.resolve(cwd, 'src', 'views');
const distViewsPath = path.resolve(cwd, 'dist', 'views');
const fs = require('fs');
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

// Run scenario and return event log
app.get('/run-sandbox', (req, res) => {
  runScenario();
  res.json({
    status: 'success',
    events: eventLog,
    // TODO: Add final state snapshots by refactoring sandbox to export/return relevant aggregates if needed.
  });
});

// ---------- INDIVIDUAL VIEW ROUTES ----------

// Render full individual view (traits, state, htmx eventlog)
app.get('/individual/:id', (req, res) => {
  runScenario();
  const { id } = req.params;
  const individual = individualAggregates[id] || null;
  if (!individual) {
    res.status(404).send(`<h2>Individual not found</h2>`);
  }
  // Filter eventLog for this individual based on participant (id match in event payload)
  const events =
    eventLog.filter((evt) => {
      const payload = evt.payload as any;
      return (
        payload &&
        (payload.id === id ||
          payload.actor === individual.name ||
          payload.member === individual.name)
      );
    }) || [];
  res.render('individual/show', {
    title: `Individual ${individual.name}`,
    individual,
    eventLog: events,
  });
});

// htmx: partial refresh for event log/activity/state section
app.get('/htmx/individual/:id/state', (req, res) => {
  const { id } = req.params;
  const individual = individualAggregates[id] || null;
  if (!individual) {
    res.status(404).send(`<div>Individual not found</div>`);
  }
  const events =
    eventLog.filter((evt) => {
      const payload = evt.payload as any;
      return (
        payload &&
        (payload.id === id ||
          payload.actor === individual.name ||
          payload.member === individual.name)
      );
    }) || [];
  res.render('partials/event_log', { events });
});

app.get('/', (req, res) => {
  res.send(`
    <h2>Game1 Sandbox Server</h2>
    <p>Use <a href="/run-sandbox">/run-sandbox</a> to run the GeopoliticalUserflow scenario.</p>
    <p>Returns event log as JSON. For production, snapshotting and isolation logic should be reviewed.</p>
    <p>Try <a href="/individual/usa_ldr">/individual/usa_ldr</a></p>
  `);
});

// TODO: Group views, more robust snapshotting, error handling, and full domain extraction.

app.listen(PORT, () => {
  console.log(`Sandbox server listening on http://localhost:${PORT}`);
});
