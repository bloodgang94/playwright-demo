import { mergeTests, expect } from '@playwright/test';
import { Language, blockSearchResults, homeFixture } from '@playwright/ui';
import { allure } from 'allure-playwright';

const test = mergeTests(homeFixture);

test.describe('example group', () => {
  test.beforeEach(async () => {
    await allure.owner('ROWI TECH');
    await allure.epic('Conference');
    await allure.feature('Allure Feature');
    await allure.link(
      'https://allurereport.org/docs/playwright/',
      'allure docs',
    );
  });
  test('Visual comparison example', async ({ home }) => {
    await allure.story('Visual comparisons example');
    // uncomment following code to make fail visual test
    // await test.step('And: This test is made to fail', async () => {
    //   await home.makeVisualToFail();
    // });
    await test.step('Then: Heading matches to master', async () => {
      await expect(home.header).toHaveScreenshot();
    });
  });
  test.describe('Parametrize fixture', () => {
    test.use({ language: Language.Java });
    test('Current language is matches to chosen one in fixture', async ({
      home,
      language,
    }) => {
      await allure.story('Parametrize fixture example');
      await allure.addParameter('Chosen language', language!);
      await test.step('Then: Chosen language matches to current', async () => {
        await expect(home.currentLanguage).toHaveText(language!);
      });
    });
  });
  test.describe('Parametrize tests', async () => {
    for (const testCase of [
      Language.CSharp,
      Language.Java,
      Language.Node,
      Language.Python,
    ])
      test(`Current language is matches to chosen ${testCase}`, async ({
        home,
      }) => {
        await allure.story('Parametrize test scenario using for statement');
        await allure.addParameter('test case', testCase);
        await test.step(`When: I choose ${testCase} programming language`, async () => {
          await home.chooseLanguage(testCase);
        });
        await test.step('Then: Chosen language matches to current', async () => {
          await expect(home.currentLanguage).toHaveText(testCase);
        });
      });
  });
  test.describe('Mocking network responses', () => {
    test.beforeEach(async ({ context }) => {
      await test.step('And: I have pattern without results', async () => {
        await blockSearchResults(context);
      });
    });
    test('No search results', async ({ home }) => {
      await home.search('Locators');
      await expect(home.foundResults).toHaveCount(0);
    });
  });
});
