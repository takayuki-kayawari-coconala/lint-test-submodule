import graphqlPlugin from '@graphql-eslint/eslint-plugin';
const subgraphCamelPrefixes = [
    // プロフィール
    'profile',
    // ココナラ募集
    'jobmatching',
];
// 先頭を大文字に変換
const subgraphPascalPrefixes = subgraphCamelPrefixes.map((prefix) => prefix.charAt(0).toUpperCase() + prefix.slice(1));
const createFieldTypeRuleKey = (type) => {
    const fields = [
        // nullable type
        `FieldDefinition[gqlType.name.value=${type}]`,
        `InputValueDefinition[gqlType.name.value=${type}]`,
        // non nullable type (ASTの構造上、gqlType.gqlTypeとなる)
        `FieldDefinition[gqlType.gqlType.name.value=${type}]`,
        `InputValueDefinition[gqlType.gqlType.name.value=${type}]`,
    ];
    return fields.join(',');
};
// プリフィックスをマージする
// e.g. (['a', 'b'], ['C', 'D']) => ['aC', 'aD', 'bC', 'bD']
const mergePrefixes = (heads, tails) => {
    return heads.flatMap((head) => tails.map((tail) => `${head}${tail}`));
};
// 共通のベース設定
const baseRules = {
    '@apigateway/graphql-schema-eslint/no-refer-types': [
        'error',
        {
            restrictTypePattern: '^(?:AuthUser)$',
        },
    ],
    '@apigateway/graphql-schema-eslint/require-by-id-suffix-on-query': 'error',
    '@apigateway/graphql-schema-eslint/require-non-nullable-on-list-query': 'error',
    '@apigateway/graphql-schema-eslint/require-nullable-on-non-list-arguments-query': 'error',
    '@apigateway/graphql-schema-eslint/require-suffix-on-query': [
        'error',
        {
            argumentConditionPattern: '^(take|offset)$',
            suffix: 'Offset',
            // ルールに合致しない既存のQueryが存在するため、例外として設定
            ignorePattern: '^jobmatching',
        },
    ],
    '@apigateway/graphql-schema-eslint/require-union-result-on-mutation': 'error',
    ...graphqlPlugin.configs['flat/schema-all'].rules,
    ...graphqlPlugin.configs['flat/schema-relay'].rules,
    '@graphql-eslint/alphabetize': 'off',
    '@graphql-eslint/input-name': [
        'error',
        {
            checkInputType: true,
            caseSensitiveInputType: false,
        },
    ],
    '@graphql-eslint/no-unreachable-types': 'off',
    '@graphql-eslint/no-root-type': [
        'error',
        {
            disallow: ['subscription'],
        },
    ],
    '@graphql-eslint/relay-edge-types': [
        'error',
        {
            listTypeCanWrapOnlyEdgeType: false,
        },
    ],
    '@graphql-eslint/require-description': [
        'error',
        {
            types: true,
            InterfaceTypeDefinition: true,
            ObjectTypeDefinition: true,
            OperationDefinition: true,
            ScalarTypeDefinition: true,
            UnionTypeDefinition: true,
            InputValueDefinition: false,
            DirectiveDefinition: false,
            ignoredSelectors: [
                '[type=ObjectTypeDefinition][name.value=/^(?:Query|Mutation)$/]',
                '[type=DirectiveDefinition] > *',
            ],
        },
    ],
    '@graphql-eslint/require-field-of-type-query-in-mutation-result': 'off',
    '@graphql-eslint/require-nullable-result-in-root': 'off',
    '@graphql-eslint/strict-id-in-types': [
        'error',
        {
            exceptions: {
                suffixes: ['Connection', 'PageInfo', 'Edge', 'Result', 'Error', 'Input', 'Filter', 'Dto'],
            },
        },
    ],
    '@graphql-eslint/no-typename-prefix': 'warn',
};
// プレフィックスありの追加ルール
const QUERY_FORBIDDEN_TERMS = ['Query', 'List', 'Get'];
const MUTATION_FORBIDDEN_TERMS = ['Mutation', 'Insert'];
const ENUM_FORBIDDEN_TERMS = ['Enum'];
const INTERFACE_FORBIDDEN_TERMS = ['Interface'];
const UNION_FORBIDDEN_TERMS = ['Union'];
const OBJECT_TYPE_FORBIDDEN_TERMS = ['Type', 'Model', 'Output'];
const prefixRules = (isUsePrefix) => ({
    '@graphql-eslint/naming-convention': [
        'error',
        {
            allowLeadingUnderscore: true,
            types: 'PascalCase',
            FieldDefinition: 'camelCase',
            InputValueDefinition: 'camelCase',
            Argument: 'camelCase',
            DirectiveDefinition: 'camelCase',
            EnumValueDefinition: 'UPPER_CASE',
            'FieldDefinition[parent.name.value=Query]': {
                forbiddenPrefixes: QUERY_FORBIDDEN_TERMS,
                ...(isUsePrefix && {
                    forbiddenPrefixes: mergePrefixes(subgraphCamelPrefixes, QUERY_FORBIDDEN_TERMS),
                    requiredPrefixes: subgraphCamelPrefixes,
                }),
                forbiddenSuffixes: QUERY_FORBIDDEN_TERMS,
                ignorePattern: '^(?:me)$',
            },
            'FieldDefinition[parent.name.value=Mutation]': {
                forbiddenPrefixes: MUTATION_FORBIDDEN_TERMS,
                ...(isUsePrefix && {
                    forbiddenPrefixes: mergePrefixes(subgraphCamelPrefixes, MUTATION_FORBIDDEN_TERMS),
                    requiredPrefixes: subgraphCamelPrefixes,
                }),
                forbiddenSuffixes: MUTATION_FORBIDDEN_TERMS,
            },
            'EnumTypeDefinition,EnumTypeExtension': {
                forbiddenPrefixes: ENUM_FORBIDDEN_TERMS,
                ...(isUsePrefix && {
                    forbiddenPrefixes: mergePrefixes(subgraphPascalPrefixes, ENUM_FORBIDDEN_TERMS),
                    requiredPrefixes: subgraphPascalPrefixes,
                }),
                forbiddenSuffixes: ENUM_FORBIDDEN_TERMS,
                ignorePattern: '^(?:OrderDirection)$',
            },
            'InterfaceTypeDefinition,InterfaceTypeExtension': {
                forbiddenPrefixes: INTERFACE_FORBIDDEN_TERMS,
                ...(isUsePrefix && {
                    forbiddenPrefixes: mergePrefixes(subgraphPascalPrefixes, INTERFACE_FORBIDDEN_TERMS),
                    requiredPrefixes: subgraphPascalPrefixes,
                }),
                forbiddenSuffixes: INTERFACE_FORBIDDEN_TERMS,
                ignorePattern: '^(?:Node|Connection|Edge)$',
            },
            'UnionTypeDefinition,UnionTypeExtension': {
                forbiddenPrefixes: UNION_FORBIDDEN_TERMS,
                ...(isUsePrefix && {
                    forbiddenPrefixes: mergePrefixes(subgraphPascalPrefixes, UNION_FORBIDDEN_TERMS),
                    requiredPrefixes: subgraphPascalPrefixes,
                }),
                forbiddenSuffixes: UNION_FORBIDDEN_TERMS,
            },
            'ObjectTypeDefinition,ObjectTypeExtension': {
                forbiddenPrefixes: OBJECT_TYPE_FORBIDDEN_TERMS,
                ...(isUsePrefix && {
                    forbiddenPrefixes: mergePrefixes(subgraphPascalPrefixes, OBJECT_TYPE_FORBIDDEN_TERMS),
                    requiredPrefixes: subgraphPascalPrefixes,
                }),
                forbiddenSuffixes: OBJECT_TYPE_FORBIDDEN_TERMS,
                ignorePattern: '^(?:Query|Mutation|PageInfo|AuthUser|PublicUser|Error)$',
            },
            ...createCommonFieldRules(),
        },
    ],
});
// 共通のフィールド名ルール生成関数
const createCommonFieldRules = () => {
    return {
        [createFieldTypeRuleKey('DateTime')]: {
            requiredSuffixes: ['At'],
            ignorePattern: '^(?:startTime|endTime)$',
        },
        [createFieldTypeRuleKey('LocalDate')]: {
            requiredSuffixes: ['Date'],
        },
        [createFieldTypeRuleKey('LocalTime')]: {
            requiredSuffixes: ['Time'],
        },
        [createFieldTypeRuleKey('Boolean')]: {
            requiredPrefixes: ['is', 'has'],
            ignorePattern: '^(?:resolvable|forceResolver)$',
        },
        InputObjectTypeDefinition: {
            requiredSuffixes: ['Filter', 'Order', 'Input'],
        },
        'InputValueDefinition[parent.parent.name.value=Query]': {
            requiredSuffixes: [
                'id',
                'Id',
                'filter',
                'orderBy',
                'first',
                'last',
                'before',
                'after',
                'offset',
                'limit',
                'take',
                'skip',
            ],
        },
        'InputValueDefinition[parent.parent.name.value=Mutation]': {
            requiredPrefixes: ['input'],
            requiredSuffixes: ['input'],
        },
        'InputValueDefinition[parent.name.value=/Order$/]': {
            requiredPrefixes: ['field', 'direction'],
            requiredSuffixes: ['field', 'direction'],
        },
    };
};
export const configs = {
    'flat/apigateway-prefix': {
        rules: {
            ...baseRules,
            ...prefixRules(true),
        },
    },
    'flat/apigateway-no-prefix': {
        rules: {
            ...baseRules,
            ...prefixRules(false),
        },
    },
};
