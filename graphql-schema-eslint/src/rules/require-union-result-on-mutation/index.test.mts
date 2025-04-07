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

        type Message {
          id: ID!
        }

        type AlreadyExistsError {
          message: String!
        }

        type ConflictError {
          message: String!
        }

        ${code}
        `,
      },
    },
  },
});

const error: RuleTester.TestCaseError = {
  message:
    'Use CreatePostResult! union type with 1 object and 0 or more errors for the return value of mutation createPost.',
};

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
  },
});

ruleTester.run('mutation-result', rule as Rule.RuleModule, {
  valid: [
    useSchema(/* GraphQL */ `
      union CreatePostResult = Post

      type Mutation {
        createPost: CreatePostResult!
      }
    `),
    useSchema(/* GraphQL */ `
      union CreatePostResult = Post | AlreadyExistsError

      type Mutation {
        createPost: CreatePostResult!
      }
    `),
    useSchema(/* GraphQL */ `
      union CreatePostResult = Post | AlreadyExistsError | ConflictError

      type Mutation {
        createPost: CreatePostResult!
      }
    `),
  ],
  invalid: [
    {
      name: 'should be union type',
      ...useSchema(/* GraphQL */ `
        type CreatePostResult {
          post: Post
        }

        type Mutation {
          createPost: CreatePostResult!
        }
      `),
      errors: [error],
    },
    {
      name: 'should be named ~Result',
      ...useSchema(/* GraphQL */ `
        union CreatePostOutput = Post | AlreadyExistsError

        type Mutation {
          createPost: CreatePostOutput!
        }
      `),
      errors: [error],
    },
    {
      name: 'should have only 1 non-error object field',
      ...useSchema(/* GraphQL */ `
        union CreatePostResult = Post | Message

        type Mutation {
          createPost: CreatePostResult!
        }
      `),
      errors: [error],
    },
    {
      name: 'should be non-null type',
      ...useSchema(/* GraphQL */ `
      union CreatePostResult = Post

        type Mutation {
          createPost: CreatePostResult
        }
      `),
      errors: [error],
    },
  ],
});
