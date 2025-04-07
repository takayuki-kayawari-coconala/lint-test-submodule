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
        }

        ${code}
        `,
      },
    },
  },
});

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
  },
});

ruleTester.run('require-by-id-suffix-on-query', rule as Rule.RuleModule, {
  valid: [
    useSchema(/* GraphQL */ `
      type Query {
        postByUserId(userId: ID!): [Post!]!
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        post(id: ID!): Post
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
      name: 'should be non-nullable(~Id)',
      ...useSchema(/* GraphQL */ `
        type Query {
          posts(userId: ID!): [Post!]!
        }
      `),
      errors: [{ message: 'The name suffix of posts query with userId as the argument must be ByUserId.' }],
    },
    {
      name: 'should be non-nullable(~id)',
      ...useSchema(/* GraphQL */ `
        type Query {
          posts(ulid: ID!): [Post!]!
        }
      `),
      errors: [{ message: 'The name suffix of posts query with ulid as the argument must be ByUlid.' }],
    },
  ],
});
