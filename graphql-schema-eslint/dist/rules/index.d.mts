export declare const rules: {
    'no-refer-types': import("@graphql-eslint/eslint-plugin").GraphQLESLintRule<{
        restrictTypePattern: string;
    }[]>;
    'require-by-id-suffix-on-query': import("@graphql-eslint/eslint-plugin").GraphQLESLintRule;
    'require-non-nullable-on-list-query': import("@graphql-eslint/eslint-plugin").GraphQLESLintRule;
    'require-nullable-on-non-list-arguments-query': import("@graphql-eslint/eslint-plugin").GraphQLESLintRule;
    'require-suffix-on-query': import("@graphql-eslint/eslint-plugin").GraphQLESLintRule<{
        ignorePattern?: string | undefined;
        argumentConditionPattern: string;
        suffix: string;
    }[]>;
    'require-union-result-on-mutation': import("@graphql-eslint/eslint-plugin").GraphQLESLintRule;
};
