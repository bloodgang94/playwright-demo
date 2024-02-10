import test, { expect as baseExpect } from '@playwright/test';
import type { APIResponse } from '@playwright/test';
import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

export const expect = baseExpect.extend({
  async toHaveSchema(response: APIResponse, expected: JSONSchemaType<object>) {
    return await test.step('Validating json schema', async () => {
      const assertionName = 'toHaveSchema';
      let pass: boolean = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let message: any;
      const json = await response.json();
      try {
        const validate = ajv.compile(expected);
        if (!validate(json)) {
          pass = false;
          const prettyJson = JSON.stringify(json, null, 2);
          const prettyError = JSON.stringify(validate.errors, null, 2);
          message = () =>
            `Schema validation error: ${prettyError}\nJSON: ${prettyJson}`;
        }
      } catch (e: unknown) {
        pass = false;
        message = () => `Schema validation error: ${e}`;
      }

      return {
        message,
        pass,
        name: assertionName,
        expected,
        actual: json,
      };
    });
  },
});
