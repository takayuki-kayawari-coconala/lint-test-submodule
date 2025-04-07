import { GraphQLESLintRule } from '@graphql-eslint/eslint-plugin';
import { FromSchema } from 'json-schema-to-ts';
declare const schema: {
    readonly type: "array";
    readonly minItems: 1;
    readonly items: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["argumentConditionPattern", "suffix"];
        readonly properties: {
            readonly argumentConditionPattern: {
                readonly type: "string";
                readonly description: "argument condition(regular expression format).";
            };
            readonly suffix: {
                readonly type: "string";
                readonly description: "required suffix.";
            };
            readonly ignorePattern: {
                readonly type: "string";
                readonly description: "ignore query name pattern(regular expression format).";
            };
        };
    };
};
type RuleOptions = FromSchema<typeof schema>;
export declare const rule: GraphQLESLintRule<RuleOptions>;
export {};
