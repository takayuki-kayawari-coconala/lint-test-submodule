import { parser } from '@graphql-eslint/eslint-plugin';
import { Rule, RuleTester } from 'eslint';
import { rule } from './index.mjs';

const useSchema = (code: string) => ({
  code,
  languageOptions: {
    parserOptions: {
      graphQLConfig: {
        schema: /* GraphQL */ `
        type AuthUser {
          id: ID!
        }

        type PublicUser {
          id: ID!
        }

        ${code}
        `,
      },
    },
  },
  options: [{ restrictTypePattern: 'AuthUser' }],
});

const error: RuleTester.TestCaseError = {
  message: 'Type AuthUser must not be referenced by any type.',
};

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
  },
});

ruleTester.run('no-refer-types', rule as Rule.RuleModule, {
  valid: [
    useSchema(/* GraphQL */ `
      type Post {
        owner: PublicUser!
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        me: AuthUser!
      }
    `),
    useSchema(/* GraphQL */ `
      type Mutation {
        updateMe: AuthUser!
      }
    `),
  ],
  invalid: [
    {
      name: 'non-null',
      ...useSchema(/* GraphQL */ `
        type Post {
          owner: AuthUser!
        }
      `),
      errors: [error],
    },
    {
      name: 'nullable',
      ...useSchema(/* GraphQL */ `
        type Post {
          owner: AuthUser
        }
      `),
      errors: [error],
    },
    {
      name: 'list',
      ...useSchema(/* GraphQL */ `
        type Post {
          owner: [AuthUser]
        }
      `),
      errors: [error],
    },
  ],
});
