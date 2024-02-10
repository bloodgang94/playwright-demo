import test, { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient, type User } from '@playwright/api';

export class ReqResAPIClient implements APIClient {
  constructor(readonly context: APIRequestContext) {}

  async createUser(user: User): Promise<APIResponse> {
    return await test.step(`create user ${JSON.stringify(user)}`, async () => {
      const response = await this.context.post('/api/users', { data: user });
      return response;
    });
  }

  async deleteUser(userId: number): Promise<APIResponse> {
    return await test.step('delete user', async () => {
      const response = await this.context.delete(`/api/users/${userId}`);
      return response;
    });
  }
}
