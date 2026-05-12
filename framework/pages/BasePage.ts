import { Page } from '@playwright/test';
import { Logger } from '../utils/Logger';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string): Promise<void> {
    try {
      Logger.action('Navigating to page', { url });
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      Logger.success('Navigation successful', { url });
    } catch (error) {
      Logger.error('Navigation failed', error);
      throw new Error(`Navigation failed for ${url}: ${error}`);
    }
  }
}
