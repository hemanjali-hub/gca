# OrangeHRM Playwright Test Automation

This project contains automated UI tests for the OrangeHRM demo application using Playwright, TypeScript, and the Page Object Model pattern.

## Features

- **Page Object Model**: Reusable page objects for Login and Dashboard pages
- **Test Fixtures**: Centralized page object instantiation
- **Logging**: Comprehensive activity logging for all operations
- **Error Handling**: Robust error handling with detailed logging
- **Test Tags**: Organized tests with smoke, sanity, and regression tags
- **Configuration**: Separate test data configuration
- **Tracing & Screenshots**: Automatic trace collection and screenshots for debugging

## Project Structure

```
assessment-pw/
├── framework/
│   ├── fixtures/
│   │   └── pageFixtures.ts      # Playwright test fixtures
│   ├── pages/
│   │   ├── BasePage.ts          # Base page class with common functionality
│   │   ├── LoginPage.ts         # Login page object
│   │   └── DashboardPage.ts     # Dashboard page object
│   └── utils/
│       └── Logger.ts            # Logging utility
├── testdata/
│   └── testconfig.ts            # Test configuration and credentials
├── tests/
│   └── login.spec.ts            # Test specifications
├── playwright.config.ts         # Playwright configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd assessment-pw
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### All Tests

Run all tests in headless mode:
```bash
npm test
```

Run all tests in headed mode (visible browser):
```bash
npm run test:headed
```

### Tagged Tests

Run specific test suites using tags:

- **UI Tests** (all tests):
  ```bash
  npm run test:ui
  ```

- **Smoke Tests** (critical functionality):
  ```bash
  npm run test:smoke
  ```

- **Sanity Tests** (basic validation):
  ```bash
  npm run test:sanity
  ```

- **Regression Tests** (extended features):
  ```bash
  npm run test:regression
  ```

### Environment-specific Tests

Run the test suite against a specific environment:

- **UAT**:
  ```bash
  npm run test:uat
  ```

- **Stage**:
  ```bash
  npm run test:stage
  ```

- **Test**:
  ```bash
  npm run test:test
  ```

Environment URLs are loaded from the corresponding `.env.uat`, `.env.stage`, and `.env.test` files.

### Specific Test Files

Run a specific test file:
```bash
npx playwright test tests/login.spec.ts
```

Run tests in a specific browser:
```bash
npx playwright test --project=chromium
```

### Debugging

- View test reports:
  ```bash
  npm run test:report
  ```

- Run tests with debugging:
  ```bash
  npx playwright test --debug
  ```

## Test Configuration

### Test Data

Test credentials and URLs are configured in `testdata/testconfig.ts`:

```typescript
export const VALID_CREDENTIALS = {
  username: 'Admin',
  password: 'admin123',
};

export const INVALID_CREDENTIALS = {
  username: 'invalid-user',
  password: 'bad-password',
};
```

### Playwright Configuration

Key settings in `playwright.config.ts`:
- **Retries**: 2 attempts per test
- **Tracing**: Enabled for every run
- **Screenshots**: Captured for every step
- **Videos**: Retained on failure
- **Browsers**: Chromium, Firefox, WebKit

## Test Examples

### Login Test

```typescript
test('Login with valid credentials should display dashboard', { tag: ['@smoke', '@sanity'] }, async ({ loginPage, dashboardPage, page }) => {
  await test.step('Open OrangeHRM login page', async () => {
    await loginPage.goto();
  });

  await test.step('Perform login with valid credentials', async () => {
    await loginPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
  });

  await test.step('Verify the dashboard is visible after login', async () => {
    await dashboardPage.expectDashboardVisible();
    await expect(page).toHaveURL(/dashboard/i);
  });
});
```

### Page Object Usage

```typescript
// LoginPage example
await loginPage.goto();
await loginPage.login('username', 'password');
await loginPage.expectLoginError('Invalid credentials');

// DashboardPage example
await dashboardPage.expectDashboardVisible();
await dashboardPage.search('Admin');
await dashboardPage.expectSearchResults('Admin');
```

## Logging

All test operations are logged with timestamps and details. Logs include:
- Navigation actions
- Form interactions
- Assertions
- Errors with stack traces

Example log output:
```
[2023-12-07T10:30:00.000Z] [ACTION] Opening login page
[2023-12-07T10:30:01.000Z] [SUCCESS] Login page loaded and username input is visible
```

## Contributing

1. Follow the Page Object Model pattern for new pages
2. Add appropriate test tags (@smoke, @sanity, @regression)
3. Include error handling and logging in new methods
4. Update test data in `testdata/testconfig.ts` for new scenarios

## Troubleshooting

- **Tests failing due to timeouts**: Increase timeout values in page objects or config
- **Locators not found**: Verify element selectors on the OrangeHRM demo site
- **Browser issues**: Run `npx playwright install` to reinstall browsers
- **TypeScript errors**: Ensure `tsconfig.json` includes all source directories

## License

ISC
