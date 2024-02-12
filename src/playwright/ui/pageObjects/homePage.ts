import { Locator } from '@playwright/test';
import { WebPage } from '@playwright/ui/pageObjects';
import { Language } from '@playwright/ui';
import test from '@playwright/test';

export class HomePage extends WebPage {
  public readonly header: Locator = this.page.getByRole('heading', {
    name: /Playwright/,
  });
  public readonly dropdown = this.page.locator("div[class*='dropdown']");
  public readonly currentLanguage = this.dropdown.locator('> a');
  public readonly languagesList = this.dropdown.locator('ul');
  public readonly searchButton = this.page.getByRole('button', {
    name: /Search/,
  });
  public readonly foundResults = this.page.locator(
    "div[class='DocSearch-Hits']",
  );

  public async makeVisualToFail(): Promise<void> {
    await this.header.evaluate((node) => (node.textContent = 'Not Playwright'));
  }

  public async chooseLanguage(language: Language): Promise<void> {
    await test.step(`When: I choose ${language} programming language`, async () => {
      await this.dropdown.hover();
      await this.languagesList.locator('li', { hasText: language }).click();
    });
  }

  public async search(pattern: string) {
    await test.step(`When: I fill search input with pattern ${pattern}`, async () => {
      await this.searchButton.click();
      await this.page.getByRole('searchbox').fill(pattern);
    });
  }
}
