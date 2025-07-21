// server.js
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const resultsPath = path.join(__dirname, 'results.json');

app.use(express.static(path.join(__dirname, 'dashboard')));

function stripAnsi(text) {
  return text.replace(/\x1B\[[0-9;]*[mGKHF]/g, '').replace(/\x1b\[[0-9]+A\x1b\[[0-9]+K/g, '');
}

app.get('/run-tests', (req, res) => {
  const testPath = req.query.path ? decodeURIComponent(req.query.path) : '';
  const command = `npx playwright test${testPath ? ` ${testPath}` : ''}`;

  exec(command, (error, stdout, stderr) => {
    const status = error ? 'failed' : 'passed';
    const timestamp = new Date().toISOString();
    let history = [];

    if (fs.existsSync(resultsPath)) {
      history = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    }

    history.unshift({ timestamp, status, scope: testPath });
    history = history.slice(0, 10);

    fs.writeFileSync(resultsPath, JSON.stringify(history, null, 2));

    const cleanOutput = stripAnsi(stdout || stderr);
    res.json({ status, output: cleanOutput });
  });
});

app.get('/results', (req, res) => {
  if (!fs.existsSync(resultsPath)) return res.json([]);
  const data = fs.readFileSync(resultsPath, 'utf8');
  res.json(JSON.parse(data));
});

app.use('/report', express.static(path.join(__dirname, 'playwright-report')));

app.listen(port, () => {
  console.log(`\u{1F680} Dashboard running at http://localhost:${port}`);
});
