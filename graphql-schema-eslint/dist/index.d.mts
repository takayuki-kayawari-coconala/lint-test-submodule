import { parser, processors } from '@graphql-eslint/eslint-plugin';
import { configs } from './configs/index.mjs';
import { rules } from './rules/index.mjs';
export { parser, processors, rules, configs };
declare const _default: {
    configs: {
        'flat/apigateway-prefix': {
            rules: {
                '@graphql-eslint/naming-convention': (string | {
                    InputObjectTypeDefinition: {
                        requiredSuffixes: string[];
                    };
                    'InputValueDefinition[parent.parent.name.value=Query]': {
                        requiredSuffixes: string[];
                    };
                    'InputValueDefinition[parent.parent.name.value=Mutation]': {
                        requiredPrefixes: string[];
                        requiredSuffixes: string[];
                    };
                    'InputValueDefinition[parent.name.value=/Order$/]': {
                        requiredPrefixes: string[];
                        requiredSuffixes: string[];
                    };
                    allowLeadingUnderscore: boolean;
                    types: string;
                    FieldDefinition: string;
                    InputValueDefinition: string;
                    Argument: string;
                    DirectiveDefinition: string;
                    EnumValueDefinition: string;
                    'FieldDefinition[parent.name.value=Query]': {
                        forbiddenSuffixes: string[];
                        ignorePattern: string;
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'FieldDefinition[parent.name.value=Mutation]': {
                        forbiddenSuffixes: string[];
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'EnumTypeDefinition,EnumTypeExtension': {
                        forbiddenSuffixes: string[];
                        ignorePattern: string;
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'InterfaceTypeDefinition,InterfaceTypeExtension': {
                        forbiddenSuffixes: string[];
                        ignorePattern: string;
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'UnionTypeDefinition,UnionTypeExtension': {
                        forbiddenSuffixes: string[];
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'ObjectTypeDefinition,ObjectTypeExtension': {
                        forbiddenSuffixes: string[];
                        ignorePattern: string;
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                })[];
                '@graphql-eslint/alphabetize': string;
                '@graphql-eslint/input-name': (string | {
                    checkInputType: boolean;
                    caseSensitiveInputType: boolean;
                })[];
                '@graphql-eslint/no-unreachable-types': string;
                '@graphql-eslint/no-root-type': (string | {
                    disallow: string[];
                })[];
                '@graphql-eslint/relay-edge-types': (string | {
                    listTypeCanWrapOnlyEdgeType: boolean;
                })[];
                '@graphql-eslint/require-description': (string | {
                    types: boolean;
                    InterfaceTypeDefinition: boolean;
                    ObjectTypeDefinition: boolean;
                    OperationDefinition: boolean;
                    ScalarTypeDefinition: boolean;
                    UnionTypeDefinition: boolean;
                    InputValueDefinition: boolean;
                    DirectiveDefinition: boolean;
                    ignoredSelectors: string[];
                })[];
                '@graphql-eslint/require-field-of-type-query-in-mutation-result': string;
                '@graphql-eslint/require-nullable-result-in-root': string;
                '@graphql-eslint/strict-id-in-types': (string | {
                    exceptions: {
                        suffixes: string[];
                    };
                })[];
                '@graphql-eslint/no-typename-prefix': string;
                '@graphql-eslint/relay-arguments': "error";
                '@graphql-eslint/relay-connection-types': "error";
                '@graphql-eslint/relay-page-info': "error";
                '@graphql-eslint/no-scalar-result-type-on-mutation': "error";
                '@graphql-eslint/require-deprecation-date': "error";
                '@graphql-eslint/require-nullable-fields-with-oneof': "error";
                '@graphql-eslint/require-type-pattern-with-oneof': "error";
                '@graphql-eslint/description-style': "error";
                '@graphql-eslint/known-argument-names': "error";
                '@graphql-eslint/known-directives': "error";
                '@graphql-eslint/known-type-names': "error";
                '@graphql-eslint/lone-schema-definition': "error";
                '@graphql-eslint/no-hashtag-description': "error";
                '@graphql-eslint/possible-type-extension': "error";
                '@graphql-eslint/provided-required-arguments': "error";
                '@graphql-eslint/require-deprecation-reason': "error";
                '@graphql-eslint/unique-directive-names': "error";
                '@graphql-eslint/unique-directive-names-per-location': "error";
                '@graphql-eslint/unique-enum-value-names': "error";
                '@graphql-eslint/unique-field-definition-names': "error";
                '@graphql-eslint/unique-operation-types': "error";
                '@graphql-eslint/unique-type-names': "error";
                '@apigateway/graphql-schema-eslint/no-refer-types': (string | {
                    restrictTypePattern: string;
                })[];
                '@apigateway/graphql-schema-eslint/require-by-id-suffix-on-query': string;
                '@apigateway/graphql-schema-eslint/require-non-nullable-on-list-query': string;
                '@apigateway/graphql-schema-eslint/require-nullable-on-non-list-arguments-query': string;
                '@apigateway/graphql-schema-eslint/require-suffix-on-query': (string | {
                    argumentConditionPattern: string;
                    suffix: string;
                    ignorePattern: string;
                })[];
                '@apigateway/graphql-schema-eslint/require-union-result-on-mutation': string;
            };
        };
        'flat/apigateway-no-prefix': {
            rules: {
                '@graphql-eslint/naming-convention': (string | {
                    InputObjectTypeDefinition: {
                        requiredSuffixes: string[];
                    };
                    'InputValueDefinition[parent.parent.name.value=Query]': {
                        requiredSuffixes: string[];
                    };
                    'InputValueDefinition[parent.parent.name.value=Mutation]': {
                        requiredPrefixes: string[];
                        requiredSuffixes: string[];
                    };
                    'InputValueDefinition[parent.name.value=/Order$/]': {
                        requiredPrefixes: string[];
                        requiredSuffixes: string[];
                    };
                    allowLeadingUnderscore: boolean;
                    types: string;
                    FieldDefinition: string;
                    InputValueDefinition: string;
                    Argument: string;
                    DirectiveDefinition: string;
                    EnumValueDefinition: string;
                    'FieldDefinition[parent.name.value=Query]': {
                        forbiddenSuffixes: string[];
                        ignorePattern: string;
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'FieldDefinition[parent.name.value=Mutation]': {
                        forbiddenSuffixes: string[];
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'EnumTypeDefinition,EnumTypeExtension': {
                        forbiddenSuffixes: string[];
                        ignorePattern: string;
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'InterfaceTypeDefinition,InterfaceTypeExtension': {
                        forbiddenSuffixes: string[];
                        ignorePattern: string;
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'UnionTypeDefinition,UnionTypeExtension': {
                        forbiddenSuffixes: string[];
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                    'ObjectTypeDefinition,ObjectTypeExtension': {
                        forbiddenSuffixes: string[];
                        ignorePattern: string;
                        forbiddenPrefixes: string[];
                        requiredPrefixes?: string[] | undefined;
                    };
                })[];
                '@graphql-eslint/alphabetize': string;
                '@graphql-eslint/input-name': (string | {
                    checkInputType: boolean;
                    caseSensitiveInputType: boolean;
                })[];
                '@graphql-eslint/no-unreachable-types': string;
                '@graphql-eslint/no-root-type': (string | {
                    disallow: string[];
                })[];
                '@graphql-eslint/relay-edge-types': (string | {
                    listTypeCanWrapOnlyEdgeType: boolean;
                })[];
                '@graphql-eslint/require-description': (string | {
                    types: boolean;
                    InterfaceTypeDefinition: boolean;
                    ObjectTypeDefinition: boolean;
                    OperationDefinition: boolean;
                    ScalarTypeDefinition: boolean;
                    UnionTypeDefinition: boolean;
                    InputValueDefinition: boolean;
                    DirectiveDefinition: boolean;
                    ignoredSelectors: string[];
                })[];
                '@graphql-eslint/require-field-of-type-query-in-mutation-result': string;
                '@graphql-eslint/require-nullable-result-in-root': string;
                '@graphql-eslint/strict-id-in-types': (string | {
                    exceptions: {
                        suffixes: string[];
                    };
                })[];
                '@graphql-eslint/no-typename-prefix': string;
                '@graphql-eslint/relay-arguments': "error";
                '@graphql-eslint/relay-connection-types': "error";
                '@graphql-eslint/relay-page-info': "error";
                '@graphql-eslint/no-scalar-result-type-on-mutation': "error";
                '@graphql-eslint/require-deprecation-date': "error";
                '@graphql-eslint/require-nullable-fields-with-oneof': "error";
                '@graphql-eslint/require-type-pattern-with-oneof': "error";
                '@graphql-eslint/description-style': "error";
                '@graphql-eslint/known-argument-names': "error";
                '@graphql-eslint/known-directives': "error";
                '@graphql-eslint/known-type-names': "error";
                '@graphql-eslint/lone-schema-definition': "error";
                '@graphql-eslint/no-hashtag-description': "error";
                '@graphql-eslint/possible-type-extension': "error";
                '@graphql-eslint/provided-required-arguments': "error";
                '@graphql-eslint/require-deprecation-reason': "error";
                '@graphql-eslint/unique-directive-names': "error";
                '@graphql-eslint/unique-directive-names-per-location': "error";
                '@graphql-eslint/unique-enum-value-names': "error";
                '@graphql-eslint/unique-field-definition-names': "error";
                '@graphql-eslint/unique-operation-types': "error";
                '@graphql-eslint/unique-type-names': "error";
                '@apigateway/graphql-schema-eslint/no-refer-types': (string | {
                    restrictTypePattern: string;
                })[];
                '@apigateway/graphql-schema-eslint/require-by-id-suffix-on-query': string;
                '@apigateway/graphql-schema-eslint/require-non-nullable-on-list-query': string;
                '@apigateway/graphql-schema-eslint/require-nullable-on-non-list-arguments-query': string;
                '@apigateway/graphql-schema-eslint/require-suffix-on-query': (string | {
                    argumentConditionPattern: string;
                    suffix: string;
                    ignorePattern: string;
                })[];
                '@apigateway/graphql-schema-eslint/require-union-result-on-mutation': string;
            };
        };
    };
    parser: {
        parseForESLint: typeof import("@graphql-eslint/eslint-plugin").parseForESLint;
        meta: {
            name: string;
            version: string | undefined;
        };
    };
    processors: {
        graphql: {
            meta: {
                name: string;
                version: string | undefined;
            };
            supportsAutofix: true;
            preprocess(code: string, filePath: string): (string | import("@graphql-eslint/eslint-plugin/esm/processor").Block)[];
            postprocess(messages: import("eslint").Linter.LintMessage[][], filePath: string): import("eslint").Linter.LintMessage[];
        };
    };
    rules: {
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
};
export default _default;
