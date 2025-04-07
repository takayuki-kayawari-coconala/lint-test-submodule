import graphqlStandardPlugin from '@graphql-eslint/eslint-plugin';
import graphqlApigatewayPlugin from '@apigateway/graphql-schema-eslint-plugin';

const schemaPath = '../**/*.{graphql,graphqls}';
const schemaPaths = [schemaPath];

export default [
  {
    // Setup GraphQL Parser
    files: schemaPaths,
    languageOptions: {
      parser: graphqlApigatewayPlugin.parser,
      parserOptions: {
        graphQLConfig: {
          schema: schemaPaths,
        },
      },
    },
    plugins: {
      '@graphql-eslint': graphqlStandardPlugin,
      '@apigateway/graphql-schema-eslint': graphqlApigatewayPlugin,
    },
  },
  {
    // Setup Schema Rules Prefix
    files: [schemaPath],
    rules: {
      ...graphqlApigatewayPlugin.configs['flat/apigateway-prefix'].rules,
    },
  }
];
