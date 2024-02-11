import test from '@playwright/test';
import { HomePage } from '@playwright/ui';
import { Language } from '@playwright/ui/enums';

export type HomeOptions = {
  language: Language | undefined;
};

export type HomeFixture = {
  home: HomePage;
};

export const homeFixture = test.extend<HomeFixture & HomeOptions>({
  language: [undefined, { option: true }],
  home: async ({ page, language }, use) => {
    await test.step('Given: I opened home page of docs', async () => {
      await page.goto('/');
    });
    const home = new HomePage(page);
    if (language)
      await test.step(`And: My main programming language is ${language}`, async () => {
        await home.chooseLanguage(language);
      });
    await use(home);
    await page.close();
  },
});
