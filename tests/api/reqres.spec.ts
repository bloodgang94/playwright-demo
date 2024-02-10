import { test, expect, UserResponse } from '@playwright/api';
import { faker } from '@faker-js/faker';
import { userResponseSchema } from '@playwright/api';
import { allure } from 'allure-playwright';

test.describe('user', () => {
  let user: UserResponse;

  test.beforeEach(async ({}) => {
    await allure.label('project', 'api');
    await allure.epic('Register');
    await allure.story('Create user');
    await allure.owner('Rowi.tech');
  });

  test('create user', async ({ reqResAPIClient }) => {
    const response = await reqResAPIClient.createUser({
      name: faker.internet.userName(),
      job: faker.person.jobTitle(),
    });

    expect(response.ok()).toBeTruthy();
    await expect(response).toHaveSchema(userResponseSchema);
    user = (await response.json()) as UserResponse;
  });

  test.afterEach('delete user', async ({ reqResAPIClient }) => {
    const response = await reqResAPIClient.deleteUser(
      user.id as unknown as number,
    );
    expect(response.status()).toBe(204);
  });
});
