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
  message: 'non-list query post with arguments should return nullable.',
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
        post(id: ID!): Post
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        post: Post!
      }
    `),
    useSchema(/* GraphQL */ `
      type PostsFilter {
        title: String!
      }
      type Query {
        posts(filter: PostsFilter!): [Post!]!
      }
    `),
  ],
  invalid: [
    {
      name: 'should be nullable',
      ...useSchema(/* GraphQL */ `
        type Query {
          post(id: ID!): Post!
        }
      `),
      errors: [error],
    },
  ],
});
