import { GraphQLESLintRule, GraphQLESTreeNode } from '@graphql-eslint/eslint-plugin';
import { FieldDefinitionNode } from 'graphql';
import { FromSchema } from 'json-schema-to-ts';

const RULE_ID = 'require-suffix-on-query';

const schema = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    required: ['argumentConditionPattern', 'suffix'],
    properties: {
      argumentConditionPattern: {
        type: 'string',
        description: 'argument condition(regular expression format).',
      },
      suffix: {
        type: 'string',
        description: 'required suffix.',
      },
      ignorePattern: {
        type: 'string',
        description: 'ignore query name pattern(regular expression format).',
      },
    },
  },
} as const;

type RuleOptions = FromSchema<typeof schema>;

const usage = [
  {
    argumentConditionPattern: '^offset$',
    suffix: 'Offset',
  },
];

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    type: 'problem',
    hasSuggestions: false,
    docs: {
      category: 'Schema',
      description: 'Some queries should be suffixed.',
      url: `https://github.com/welself/apigateway/tree/develop/graphql-schema-eslint/src/rules/${RULE_ID}`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type Query {
              posts(offset: Int!, limit: Int!): [Post!]!
            }
          `,
          usage,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type Post {
              postsOffset(offset: Int!, limit: Int!): [Post!]!
            }
          `,
          usage,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type Post {
              posts(first: Int, after: ID, last: Int, before: ID): [Post!]!
            }
          `,
          usage,
        },
      ],
    },
    schema,
  },
  create(context) {
    const selector = [
      `:matches(ObjectTypeDefinition, ObjectTypeExtension)[name.value=Query]`,
      '> FieldDefinition',
    ].join(' ');

    const options = context.options.map((option) => ({
      argumentConditionPattern: new RegExp(option.argumentConditionPattern),
      suffix: option.suffix,
      ignorePattern: option.ignorePattern ? new RegExp(option.ignorePattern) : undefined,
    }));

    return {
      [selector](node: GraphQLESTreeNode<FieldDefinitionNode>) {
        options.forEach((option) => {
          if (option.ignorePattern?.test(node.name.value)) {
            return;
          }

          const argument = node.arguments?.find((a) => option.argumentConditionPattern.test(a.name.value));
          if (!argument) {
            return;
          }

          if (!node.name.value.endsWith(option.suffix)) {
            context.report({
              node,
              message: `The name of query ${node.name.value} with argument ${argument.name.value} should be ${node.name.value}${option.suffix}.`,
            });
          }
        });
      },
    };
  },
};
