import { test as base } from '@playwright/test';
import { ReqResAPIClient } from '@playwright/api';

export type ReqResFixture = {
  reqResAPIClient: ReqResAPIClient;
};

export const test = base.extend<ReqResFixture>({
  reqResAPIClient: async ({ request }, use) => {
    await use(new ReqResAPIClient(request));
  },
});
