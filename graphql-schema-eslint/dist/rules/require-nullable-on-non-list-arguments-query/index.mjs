import { Kind } from 'graphql';
const RULE_ID = 'require-nullable-on-non-list-arguments-query';
export const rule = {
    meta: {
        type: 'problem',
        hasSuggestions: false,
        docs: {
            category: 'Schema',
            description: 'The non-list query with arguments should return nullable.',
            url: `https://github.com/welself/apigateway/tree/develop/graphql-schema-eslint/src/rules/${RULE_ID}`,
            requiresSchema: true,
            examples: [
                {
                    title: 'Incorrect',
                    code: /* GraphQL */ `
            type Query {
              post(id: ID!): Post!
            }
          `,
                },
                {
                    title: 'Correct',
                    code: /* GraphQL */ `
            type Query {
              post(id: ID!): Post
            }
          `,
                },
                {
                    title: 'Correct',
                    code: /* GraphQL */ `
            type Query {
              post: Post!
            }
          `,
                },
                {
                    title: 'Correct',
                    code: /* GraphQL */ `
            type PostsFilter {
              title: String
            }
            type Query {
              posts(filter: PostsFilter!): [Post!]!
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
                if (!node.arguments?.length) {
                    // 引数なしはOK
                    return;
                }
                // 返り値がPost!形式の場合はエラー
                if (node.gqlType.kind === Kind.NON_NULL_TYPE && node.gqlType.gqlType.kind === Kind.NAMED_TYPE) {
                    // should be nullable
                    context.report({
                        node,
                        message: `non-list query ${node.name.value} with arguments should return nullable.`,
                    });
                    return;
                }
            },
        };
    },
};
