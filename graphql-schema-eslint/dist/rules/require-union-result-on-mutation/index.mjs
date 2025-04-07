import { requireGraphQLSchema, } from '@graphql-eslint/eslint-plugin';
import { Kind } from 'graphql';
const RULE_ID = 'require-union-result-on-mutation';
const report = (node, context, mutationName) => {
    const pascalMutationName = mutationName.charAt(0).toUpperCase() + mutationName.slice(1);
    context.report({
        node,
        message: `Use ${pascalMutationName}Result! union type with 1 object and 0 or more errors for the return value of mutation ${mutationName}.`,
    });
};
export const rule = {
    meta: {
        type: 'problem',
        hasSuggestions: false,
        docs: {
            category: 'Schema',
            description: 'Use a non-null union type with 1 object and 0 or more errors for the return value of the mutation.',
            url: `https://github.com/welself/apigateway/tree/develop/graphql-schema-eslint/src/rules/${RULE_ID}`,
            requiresSchema: true,
            examples: [
                {
                    title: 'Incorrect',
                    code: /* GraphQL */ `
            type Mutation {
              createPost: Post!
            }
          `,
                },
                {
                    title: 'Incorrect',
                    code: /* GraphQL */ `
            union CreatePostResult = Post
            type Mutation {
              createPost: CreatePostResult
            }
          `,
                },
                {
                    title: 'Correct',
                    code: /* GraphQL */ `
            union CreatePostResult = Post
            type Mutation {
              createPost: CreatePostResult!
            }
          `,
                },
                {
                    title: 'Correct',
                    code: /* GraphQL */ `
            union CreatePostResult = Post | AlreadyExistsError
            type Mutation {
              createPost: CreatePostResult!
            }
          `,
                },
            ],
        },
        schema: [],
    },
    create(context) {
        const schema = requireGraphQLSchema(RULE_ID, context);
        const selector = [
            `:matches(ObjectTypeDefinition, ObjectTypeExtension)[name.value=Mutation]`,
            '> FieldDefinition',
        ].join(' ');
        return {
            [selector](node) {
                const mutationName = node.name.value;
                // should be non-null type
                if (node.gqlType.kind !== Kind.NON_NULL_TYPE) {
                    report(node, context, mutationName);
                    return;
                }
                if (node.gqlType.gqlType.kind !== Kind.NAMED_TYPE) {
                    return;
                }
                const mutationReturnType = schema.getType(node.gqlType.gqlType.name.value);
                const mutationReturnNode = mutationReturnType?.astNode;
                // should be union type
                if (mutationReturnNode?.kind !== Kind.UNION_TYPE_DEFINITION) {
                    report(node, context, mutationName);
                    return;
                }
                // should be named ~Result
                const wantReturnTypeName = `${mutationName.charAt(0).toUpperCase() + mutationName.slice(1)}Result`;
                if (mutationReturnNode.name.value !== wantReturnTypeName) {
                    report(node, context, mutationName);
                    return;
                }
                if (!mutationReturnNode.types) {
                    return;
                }
                // should have only 1 non-error object field
                const values = mutationReturnNode.types.filter((t) => !t.name.value.endsWith('Error'));
                if (values.length !== 1) {
                    report(node, context, mutationName);
                    return;
                }
                // should only have object fields
                const hasNonObjectField = mutationReturnNode.types.some((t) => {
                    const valueType = schema.getType(t.name.value);
                    return valueType?.astNode?.kind !== Kind.OBJECT_TYPE_DEFINITION;
                });
                if (hasNonObjectField) {
                    report(node, context, mutationName);
                }
            },
        };
    },
};
