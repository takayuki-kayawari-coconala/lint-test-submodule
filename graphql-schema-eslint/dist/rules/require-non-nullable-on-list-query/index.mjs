import { Kind } from 'graphql';
const RULE_ID = 'require-non-nullable-on-list-query';
const report = (node, context, queryName) => {
    context.report({
        node,
        message: `list query ${queryName} should return non-null value.`,
    });
};
export const rule = {
    meta: {
        type: 'problem',
        hasSuggestions: false,
        docs: {
            category: 'Schema',
            description: 'The list query should return non-null value.',
            url: `https://github.com/welself/apigateway/tree/develop/graphql-schema-eslint/src/rules/${RULE_ID}`,
            requiresSchema: true,
            examples: [
                {
                    title: 'Incorrect',
                    code: /* GraphQL */ `
            type Query {
              posts: [Post]
            }
          `,
                },
                {
                    title: 'Incorrect',
                    code: /* GraphQL */ `
            type Query {
              posts: [Post]!
            }
          `,
                },
                {
                    title: 'Incorrect',
                    code: /* GraphQL */ `
            type Query {
              posts: [Post!]
            }
          `,
                },
                {
                    title: 'Correct',
                    code: /* GraphQL */ `
            type Query {
              posts: [Post!]!
            }
          `,
                },
            ],
        },
        schema: [],
    },
    create(context) {
        const selector = [
            ':matches(ObjectTypeDefinition, ObjectTypeExtension)[name.value=Query]',
            '> FieldDefinition',
        ].join(' ');
        return {
            [selector](node) {
                if (node.gqlType.kind === Kind.LIST_TYPE) {
                    // [Post]の場合はエラー
                    report(node, context, node.name.value);
                    return;
                }
                if (node.gqlType.kind === Kind.NON_NULL_TYPE &&
                    node.gqlType.gqlType.kind === Kind.LIST_TYPE &&
                    node.gqlType.gqlType.gqlType.kind === Kind.NAMED_TYPE) {
                    // [Post]!の場合はエラー
                    report(node, context, node.name.value);
                    return;
                }
            },
        };
    },
};
