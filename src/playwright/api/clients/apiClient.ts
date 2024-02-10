import { APIRequestContext } from '@playwright/test';

export interface APIClient {
  readonly context: APIRequestContext;
}
