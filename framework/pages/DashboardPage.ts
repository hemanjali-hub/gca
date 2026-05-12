import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';

export class DashboardPage extends BasePage {
  private dashboardHeader = this.page.getByRole('heading', { name: /dashboard/i });
  private searchInput = this.page.getByPlaceholder('Search');
  private searchResultItems = this.page.getByRole('listitem');

  async expectDashboardVisible(): Promise<void> {
    Logger.action('Verifying dashboard is visible');
    await expect(this.dashboardHeader).toBeVisible({ timeout: 30000 });
    Logger.success('Dashboard header is visible and confirmed');
  }

  async search(term: string): Promise<void> {
    Logger.action('Performing search', { term });
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
    Logger.info('Search input is visible');
    
    await this.searchInput.fill(term);
    Logger.action('Filled search field', { term });
    
    await this.searchInput.press('Enter');
    Logger.action('Pressed Enter to execute search');
    Logger.success('Search executed', { term });
  }

  async expectSearchResults(term: string): Promise<void> {
    Logger.action('Verifying search results', { term });
    await expect(this.searchResultItems.first()).toBeVisible({ timeout: 10000 });
    Logger.info('Search result items are visible');
    
    await expect(this.page.getByText(term, { exact: false })).toBeVisible({ timeout: 10000 });
    Logger.success('Search results contain expected term', { term });
  }
}
