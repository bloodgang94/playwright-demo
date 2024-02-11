import { Page } from '@playwright/test';

export abstract class WebPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
