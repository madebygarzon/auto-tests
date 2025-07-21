const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const resultsPath = path.join(__dirname, 'results.json');

// Servir dashboard estático
app.use(express.static(path.join(__dirname, 'dashboard')));

// Ejecutar tests con scope dinámico
app.get('/run-tests', (req, res) => {
  const scope = req.query.scope || ''; // ejemplos: '', 'tests/home', 'tests/home/anchor.spec.ts'
  const command = `npx playwright test ${scope}`;

  exec(command, (error, stdout, stderr) => {
    const status = error ? 'failed' : 'passed';
    const timestamp = new Date().toISOString();

    let history = [];
    if (fs.existsSync(resultsPath)) {
      try {
        history = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
      } catch {
        history = [];
      }
    }

    history.unshift({ timestamp, status, scope });
    history = history.slice(0, 10);

    fs.writeFileSync(resultsPath, JSON.stringify(history, null, 2));

    res.json({ status, output: stdout || stderr });
  });
});

// Reporte HTML
app.use('/report', express.static(path.join(__dirname, 'playwright-report')));

// Historial
app.get('/results', (req, res) => {
  if (!fs.existsSync(resultsPath)) return res.json([]);
  try {
    const data = fs.readFileSync(resultsPath, 'utf8');
    res.json(JSON.parse(data));
  } catch {
    res.json([]);
  }
});

app.listen(port, () => {
  console.log(`🚀 Dashboard running at http://localhost:${port}`);
});
