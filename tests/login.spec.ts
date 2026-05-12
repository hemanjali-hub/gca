import { test, expect } from '../framework/fixtures/pageFixtures';
import { ORANGEHRM_BASE_URL,INVALID_CREDENTIALS, VALID_CREDENTIALS } from '../testdata/testconfig';
import { Logger } from '../framework/utils/Logger';

test.describe('OrangeHRM authentication and dashboard', () => {
  test('Login with valid credentials should display dashboard', { tag: ['@smoke', '@sanity','@regression'] }, async ({ loginPage, dashboardPage, page }) => {
    await test.step('Open OrangeHRM login page', async () => {
      try {
        await loginPage.goto(ORANGEHRM_BASE_URL);
      } catch (error) {
        Logger.error('Failed to open login page', error);
        throw error;
      }
    });

    await test.step('Perform login with valid credentials', async () => {
      try {
        await loginPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
      } catch (error) {
        Logger.error('Failed to perform login with valid credentials', error);
        throw error;
      }
    });

    await test.step('Verify the dashboard is visible after login', async () => {
      try {
        await dashboardPage.expectDashboardVisible();
        await expect(page).toHaveURL(/dashboard/i);
      } catch (error) {
        Logger.error('Failed to verify dashboard visibility', error);
        throw error;
      }
    });
  });

  test('Login with invalid credentials should show an error message', { tag: '@sanity' }, async ({ loginPage }) => {
    await test.step('Open OrangeHRM login page', async () => {
      try {
        await loginPage.goto(ORANGEHRM_BASE_URL);
      } catch (error) {
        Logger.error('Failed to open login page', error);
        throw error;
      }
    });

    await test.step('Attempt login with invalid credentials', async () => {
      try {
        await loginPage.login(INVALID_CREDENTIALS.username, INVALID_CREDENTIALS.password);
      } catch (error) {
        Logger.error('Failed to attempt login with invalid credentials', error);
        throw error;
      }
    });

    await test.step('Verify an invalid credentials error is displayed', async () => {
      try {
        await loginPage.expectLoginError('Invalid credentials');
      } catch (error) {
        Logger.error('Failed to verify invalid credentials error message', error);
        throw error;
      }
    });
  });

  test('Search functionality should show results when searching from dashboard', { tag: ['@dashboard','@regression'] }, async ({ loginPage, dashboardPage }) => {
    await test.step('Log in using valid credentials', async () => {
      try {
        await loginPage.goto(ORANGEHRM_BASE_URL);
        await loginPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
        await dashboardPage.expectDashboardVisible();
      } catch (error) {
        Logger.error('Failed to log in using valid credentials', error);
        throw error;
      }
    });

    await test.step('Search for a sample user or item', async () => {
      try {
        await dashboardPage.search('Admin');
      } catch (error) {
        Logger.error('Failed to perform search', error);
        throw error;
      }
    });

    await test.step('Verify search results are displayed', async () => {
      try {
        await dashboardPage.expectSearchResults('Admin');
      } catch (error) {
        Logger.error('Failed to verify search results', error);
        throw error;
      }
    });
  });
});
