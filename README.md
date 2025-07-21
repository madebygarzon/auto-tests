# 🧪 auto-tests – E2E Testing for Partner in Publishing

This project contains automated frontend tests using [Playwright](https://playwright.dev/) to validate key public-facing features of the **Partner in Publishing** website.

The tests are organized by functionality and run daily using **GitHub Actions**.

![E2E Tests](https://github.com/your-username/auto-tests/actions/workflows/e2e.yml/badge.svg)

---

## 📁 Project Structure

```bash
auto-tests/
├── tests/                     # Main test directory
│   ├── home/                  # Home page tests
│   ├── .../              # Contact form tests
│   └── ...../             # Service navigation tests
├── playwright.config.ts       # Playwright configuration
└── .github/workflows/e2e.yml  # GitHub Actions workflow


🚀 What the tests currently validate
Navigation between home sections

Card redirections to service pages

URL and href attribute validations

Behavior of the "Partner With Us" button

(Coming soon) Form submission and section-specific content validation

▶️ How to run the tests
✅ Run all tests:

npx playwright test
✅ Run tests by functional group (directory):

npx playwright test tests/home
npx playwright test tests/contacto
npx playwright test tests/servicios
✅ Run a specific file:

npx playwright test tests/home/cards-navigation.spec.ts
✅ View the last HTML report:

npx playwright show-report
⚙️ CI Automation
This project runs tests daily at 3 AM UTC (10 PM Colombia time) using GitHub Actions.

You can also manually trigger a run via the “Actions” tab in GitHub.

📌 Requirements
Node.js 20+

All dependencies are managed with npm ci

No credentials needed: tests run against the public site

📫 Author
Carlos @madebygarzon – Fullstack Software Engineer

🧠 License
This project is intended for internal monitoring and QA. Feel free to use it as a template for your own end-to-end tests.