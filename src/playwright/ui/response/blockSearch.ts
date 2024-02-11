import { BrowserContext } from '@playwright/test';

export async function blockSearchResults(
  context: BrowserContext,
): Promise<void> {
  await context.route('**/queries?**', async (route) => {
    await route.abort();
  });
}
