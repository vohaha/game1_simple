import express from 'express';
import { geopoliticalUserflow, eventLog } from './sandbox';

// Run scenario when server starts
function runScenario() {
  // Clear previous events if any (production code may need event store per request/user).
  eventLog.length = 0;
  geopoliticalUserflow();
  // Capture state here if desired. Could be enhanced for concurrent/multi-session support.
}

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
  res.send(`
    <h2>Game1 Sandbox Server</h2>
    <p>Use <a href="/run-sandbox">/run-sandbox</a> to run the GeopoliticalUserflow scenario.</p>
    <p>Returns event log as JSON. For production, snapshotting and isolation logic should be reviewed.</p>
  `);
});

// TODO: Proper error handling, CORS/header config, domain-level request scenarios.

app.listen(PORT, () => {
  console.log(`Sandbox server listening on http://localhost:${PORT}`);
});
