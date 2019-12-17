// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

export const QuantumReportSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      meta: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          sex: { type: 'string' },
          age: { type: 'number' },
          physique: {
            type: 'object',
            properties: {
              weight: { type: 'number' },
              height: { type: 'number' },
            }
          },
          date: { type: 'string' },
        }
      },
      reports: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            fields: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  min: { type: 'number' },
                  max: { type: 'number' },
                  value: { type: 'number' },
                }
              }
            }
          }
        }
      },
    },
  }
};

// TODO(jannyHou): This is a workaround to manually
// describe the request body of 'Users/login'.
// We should either create a Credential model, or
// infer the spec from User model

const CredentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};
