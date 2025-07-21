const output = document.getElementById('output');
const viewReportBtn = document.getElementById('view-report');
const runSelect = document.getElementById('run-select');

function cleanAnsi(text) {
  return text.replace(/\u001b\[[0-9;]*m/g, '') // ANSI color codes
             .replace(/\u001b\[.*?[ABCDKJHf]/g, '') // cursor move codes
             .replace(/[\u001b\[][0-9]*[A-GJK]/g, '') // additional escape sequences
             .replace(/[\x1b\[\d{1,2};\d{1,2}H]/g, '') // cursor positioning
             .replace(/[\x1b][\[\d;]*[A-Za-z]/g, '') // general cleanup
             .replace(/\r/g, ''); // carriage returns
}

async function runTests(scope = '') {
  output.textContent = 'Running tests...';
  viewReportBtn.disabled = true;

  const res = await fetch(`/run-tests?scope=${encodeURIComponent(scope)}`);
  const data = await res.json();

  const cleanOutput = cleanAnsi(data.output);
  output.textContent = data.status === 'passed'
    ? `✅ Tests passed\n\n${cleanOutput}`
    : `❌ Tests failed\n\n${cleanOutput}`;

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
