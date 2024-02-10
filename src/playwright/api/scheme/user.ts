import { UserResponse } from '@playwright/api';
import { JSONSchemaType } from 'ajv';

export const userResponseSchema: JSONSchemaType<UserResponse> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    job: {
      type: 'string',
    },
    id: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
    },
  },
  required: ['name', 'job', 'id', 'createdAt'],
};
