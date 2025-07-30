import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Test Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/style.css" />
        <script src="/script.js" defer></script>
        <style>{`
          body { background-color: #121212; color: #f0f0f0; }
          .test-pass { color: #4ade80; font-weight: bold; }
          .test-fail { color: #f87171; font-weight: bold; }
          .test-summary { margin-top: 1rem; padding: 1rem; border-radius: 0.5rem; background-color: #1f2937; }
          .test-item { padding: 0.5rem; border-bottom: 1px solid #374151; }
          .icon-pass::before { content: '✅'; margin-right: 0.5rem; }
          .icon-fail::before { content: '❌'; margin-right: 0.5rem; }
        `}</style>
      </Head>
      <div className="container py-5">
        <h1 className="mb-4 text-center">🧪 Automation Testing PIP Website</h1>
        <div className="card-grid">
          <div className="site-card">
            <h5>PIP Website</h5>
            <a href="https://partnerinpublishing.com/" target="_blank" rel="noreferrer">View Site</a>
          </div>
          <div className="site-card">
            <h5>Grade Potential Tutoring</h5>
            <a href="https://gradepotentialtutoring.ue1.rapydapps.cloud/" target="_blank" rel="noreferrer">View Site</a>
          </div>
          <div className="site-card">
            <h5>Itopia</h5>
            <a href="https://itopia.com/" target="_blank" rel="noreferrer">View Site</a>
          </div>
          <div className="site-card">
            <h5>Metric Marine</h5>
            <a href="https://www.metricmarine.com/" target="_blank" rel="noreferrer">View Site</a>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-8">
            <select id="run-select" className="form-select">
              <option value="">🔁 Run all tests</option>
              <option value="tests/home">🏠 Run all home tests</option>
              <option value="tests/home/home-anchor.spec.ts">📍 Run only anchor test</option>
              <option value="tests/home/home-cards-navigation.spec.ts">🧭 Run only cards test</option>
            </select>
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button id="run-tests" className="btn btn-success w-100">▶️ Run Tests</button>
            <button id="view-report" className="btn btn-outline-info w-100" disabled>🔍 View Report</button>
          </div>
        </div>
        <div className="test-summary">
          <h2>📋 Test Result Summary</h2>
          <ul id="result-list" className="list-unstyled"></ul>
        </div>
        <h2 className="mt-5">📜 Test History</h2>
        <ul id="history" className="list-group"></ul>
      </div>
    </>
  );
}
