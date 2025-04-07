import { parser } from '@graphql-eslint/eslint-plugin';
import { Rule, RuleTester } from 'eslint';
import { rule } from './index.mjs';

const useSchema = (code: string) => ({
  code,
  languageOptions: {
    parserOptions: {
      graphQLConfig: {
        schema: /* GraphQL */ `
        type Post {
          id: ID!
          title: String!
        }

        ${code}
        `,
      },
    },
  },
});

const error: RuleTester.TestCaseError = {
  message: 'list query posts should return non-null value.',
};

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
  },
});

ruleTester.run('require-nullable-on-non-list-arguments-query', rule as Rule.RuleModule, {
  valid: [
    useSchema(/* GraphQL */ `
      type Query {
        posts: [Post!]!
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        post: Post
      }
    `),
  ],
  invalid: [
    {
      name: 'should be non-nullable(all)',
      ...useSchema(/* GraphQL */ `
        type Query {
          posts: [Post]
        }
      `),
      errors: [error],
    },
    {
      name: 'should be non-nullable(outer)',
      ...useSchema(/* GraphQL */ `
        type Query {
          posts: [Post!]
        }
      `),
      errors: [error],
    },
    {
      name: 'should be non-nullable(inner)',
      ...useSchema(/* GraphQL */ `
        type Query {
          posts: [Post]!
        }
      `),
      errors: [error],
    },
  ],
});
