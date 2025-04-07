const RULE_ID = 'require-by-id-suffix-on-query';
export const rule = {
    meta: {
        type: 'problem',
        hasSuggestions: false,
        docs: {
            category: 'Schema',
            description: 'The name suffix of a query with xxxId as the argument must be ByXxxID.',
            url: `https://github.com/welself/apigateway/tree/develop/graphql-schema-eslint/src/rules/${RULE_ID}`,
            requiresSchema: true,
            examples: [
                {
                    title: 'Incorrect',
                    code: /* GraphQL */ `
            type Query {
              posts(userId: ID!): [Post!]!
            }
          `,
                },
                {
                    title: 'Correct',
                    code: /* GraphQL */ `
            type Query {
              postByUserId(userId: ID!): [Post!]!
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
                const id = node.arguments?.find((a) => /.[iI]d$/.test(a.name.value));
                if (!id) {
                    return;
                }
                const wantSuffix = `By${id.name.value.charAt(0).toUpperCase() + id.name.value.slice(1)}`;
                if (!node.name.value.endsWith(wantSuffix)) {
                    const queryName = node.name.value;
                    context.report({
                        node,
                        message: `The name suffix of ${queryName} query with ${id.name.value} as the argument must be ${wantSuffix}.`,
                    });
                }
            },
        };
    },
};
