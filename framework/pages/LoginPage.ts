import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';

export class LoginPage extends BasePage {
  private usernameInput = this.page.locator(
    'input[name="txtUsername"], input#txtUsername, input[name="username"], input[placeholder="Username"]'
  );
  private passwordInput = this.page.locator(
    'input[name="txtPassword"], input#txtPassword, input[name="password"], input[type="password"]'
  );
  private submitButton = this.page.locator(
    'button#btnLogin, input#btnLogin, button[type="submit"], input[type="submit"]'
  );
  private errorMessage = this.page.getByRole('alert');

  async goto(url:string): Promise<void> {
    Logger.action('Opening login page');
    await this.navigate(url);
    await expect(this.usernameInput).toBeVisible({ timeout: 15000 });
    Logger.success('Login page loaded and username input is visible');
  }

  async login(username: string, password: string): Promise<void> {
    Logger.action('Attempting login', { username });
    await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
    Logger.info('Username input is visible');
    
    await this.usernameInput.fill(username);
    Logger.action('Filled username field', { username });
    
    await this.passwordInput.fill(password);
    Logger.action('Filled password field');
    
    await this.submitButton.click();
    Logger.action('Clicked submit button');
    Logger.success('Login form submitted');
  }

  async expectLoginError(expectedText?: string): Promise<void> {
    Logger.action('Verifying login error message', { expectedText });
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    Logger.info('Error message is visible');
    
    if (expectedText) {
      await expect(this.errorMessage).toHaveText(new RegExp(expectedText, 'i'));
      Logger.success('Error message matches expected text', { expectedText });
    }
  }
}
