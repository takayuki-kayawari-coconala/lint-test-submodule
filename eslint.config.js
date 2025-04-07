import graphqlStandardPlugin from '@graphql-eslint/eslint-plugin';
import graphqlApigatewayPlugin from '@apigateway/graphql-schema-eslint-plugin';

const schemaPath = '**/*.{graphql,graphqls}';

const subgraphCorePath = 'internal/graph/subgraph/schema/core/**/*.{graphql,graphqls}';
const subgraphCoconalaPath = 'internal/graph/subgraph/schema/coconala/**/*.{graphql,graphqls}';
const subgraphProfilePath = 'internal/graph/subgraph/schema/profile/**/*.{graphql,graphqls}';

const schemaPaths = [
  schemaPath,
  subgraphCorePath,
  subgraphCoconalaPath,
  subgraphProfilePath,
];

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
    files: [schemaPath, subgraphProfilePath],
    rules: {
      ...graphqlApigatewayPlugin.configs['flat/apigateway-prefix'].rules,
    },
  },
  {
    // Setup Schema Rules No Prefix
    files: [subgraphCorePath, subgraphCoconalaPath],
    rules: {
      ...graphqlApigatewayPlugin.configs['flat/apigateway-no-prefix'].rules,
    },
  },
];
