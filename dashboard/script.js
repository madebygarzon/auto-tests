// dashboard/script.js

const output = document.getElementById('output');
const viewReportBtn = document.getElementById('view-report');
const runSelect = document.getElementById('run-select');

async function runTests(scope = '') {
  output.textContent = 'Running tests...';
  viewReportBtn.disabled = true;

  const res = await fetch(`/run-tests?scope=${encodeURIComponent(scope)}`);
  const data = await res.json();

  output.textContent = data.status === 'passed'
    ? `✅ Tests passed\n\n${data.output}`
    : `❌ Tests failed\n\n${data.output}`;

  if (data.status === 'passed') viewReportBtn.disabled = false;
  loadHistory();
}

document.getElementById('run-tests').addEventListener('click', () => {
  const selectedScope = runSelect.value;
  runTests(selectedScope);
});

viewReportBtn.addEventListener('click', () => {
  window.open('/report', '_blank');
});

async function loadHistory() {
  const res = await fetch('/results');
  const history = await res.json();

  const historyList = document.getElementById('history');
  historyList.innerHTML = '';

  history.forEach(entry => {
    const li = document.createElement('li');
    const date = new Date(entry.timestamp).toLocaleString();
    li.textContent = `${date} – ${entry.scope || 'ALL'} – ${entry.status === 'passed' ? '✅ PASSED' : '❌ FAILED'}`;
    historyList.appendChild(li);
  });
}

window.onload = loadHistory;

document.getElementById('run-tests').addEventListener('click', async () => {
  const selected = document.getElementById('run-select').value;
  const output = document.getElementById('output');
  output.textContent = 'Running tests...';
  document.getElementById('view-report').disabled = true;

  const res = await fetch('/run-tests' + (selected ? `?target=${encodeURIComponent(selected)}` : ''));
  const data = await res.json();

  output.textContent = data.output;

  if (data.status === 'passed') {
    document.getElementById('view-report').disabled = false;
  }

  loadHistory();
});