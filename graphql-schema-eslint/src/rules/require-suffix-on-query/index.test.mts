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
  options: [
    {
      argumentConditionPattern: '^offset$',
      suffix: 'Offset',
      ignorePattern: '^ignorePrefix',
    },
  ],
});

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
  },
});

ruleTester.run('require-suffix-on-query', rule as Rule.RuleModule, {
  valid: [
    useSchema(/* GraphQL */ `
      type Query {
        postsOffset(offset: Int!, limit: Int!): [Post!]!
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        posts(first: Int, after: ID, last: Int, before: ID): [Post!]!
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        ignorePrefixPosts(offset: Int!, limit: Int!): [Post!]!
      }
    `),
  ],
  invalid: [
    {
      name: 'should have suffix',
      ...useSchema(/* GraphQL */ `
        type Query {
          posts(offset: Int!, limit: Int!): [Post!]!
        }
      `),
      errors: [
        {
          message: 'The name of query posts with argument offset should be postsOffset.',
        },
      ],
    },
  ],
});
