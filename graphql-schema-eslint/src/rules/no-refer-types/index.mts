import { GraphQLESLintRule, GraphQLESTreeNode } from '@graphql-eslint/eslint-plugin';
import { FieldDefinitionNode, Kind, NamedTypeNode, TypeNode } from 'graphql';
import { FromSchema } from 'json-schema-to-ts';

const RULE_ID = 'no-refer-types';

const schema = {
  type: 'array',
  minItems: 1,
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    required: ['restrictTypePattern'],
    properties: {
      restrictTypePattern: {
        type: 'string',
        description: 'Type pattern that restrict references from any type (regular expression format).',
      },
    },
  },
} as const;

const usage = [{ restrictTypePattern: '^AuthUser$' }];

type RuleOptions = FromSchema<typeof schema>;

const getNamedNode = (node: GraphQLESTreeNode<TypeNode>): GraphQLESTreeNode<NamedTypeNode> => {
  if (node.kind === Kind.NAMED_TYPE) {
    return node;
  }
  return getNamedNode(node.gqlType);
};

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    type: 'problem',
    hasSuggestions: false,
    docs: {
      category: 'Schema',
      description: 'Some types must not be referenced from any type.',
      url: `https://github.com/welself/apigateway/tree/develop/graphql-schema-eslint/src/rules/${RULE_ID}`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type Post {
              owner: AuthUser! # confidential type is NG
            }
          `,
          usage,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type Post {
              owner: PublicUser! # public type is OK
            }
          `,
          usage,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type Query {
              me: AuthUser! # query is OK
            }
          `,
          usage,
        },
      ],
    },
    schema,
  },
  create(context) {
    const options: RuleOptions[number] = context.options[0];
    const restrictTypePattern = new RegExp(options.restrictTypePattern);

    const selector = [
      `:matches(ObjectTypeDefinition, ObjectTypeExtension)[name.value!=/^(?:Query|Mutation)$/]`,
      '> FieldDefinition',
    ].join(' ');

    return {
      [selector](node: GraphQLESTreeNode<FieldDefinitionNode>) {
        const field = getNamedNode(node.gqlType);

        // should not refer to prohibited types
        if (restrictTypePattern.test(field.name.value)) {
          context.report({
            node: field,
            message: `Type ${field.name.value} must not be referenced by any type.`,
          });
        }
      },
    };
  },
};
