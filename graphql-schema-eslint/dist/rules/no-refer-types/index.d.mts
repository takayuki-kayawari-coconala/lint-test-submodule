import { GraphQLESLintRule } from '@graphql-eslint/eslint-plugin';
import { FromSchema } from 'json-schema-to-ts';
declare const schema: {
    readonly type: "array";
    readonly minItems: 1;
    readonly maxItems: 1;
    readonly items: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["restrictTypePattern"];
        readonly properties: {
            readonly restrictTypePattern: {
                readonly type: "string";
                readonly description: "Type pattern that restrict references from any type (regular expression format).";
            };
        };
    };
};
type RuleOptions = FromSchema<typeof schema>;
export declare const rule: GraphQLESLintRule<RuleOptions>;
export {};
