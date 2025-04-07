import { rule as noReferTypes } from './no-refer-types/index.mjs';
import { rule as requireByIdSuffixOnQuery } from './require-by-id-suffix-on-query/index.mjs';
import { rule as requireNonNullableOnListQuery } from './require-non-nullable-on-list-query/index.mjs';
import { rule as requireNullableOnNonListArgumentsQuery } from './require-nullable-on-non-list-arguments-query/index.mjs';
import { rule as requireUnionResultOnMutation } from './require-union-result-on-mutation/index.mjs';
import { rule as requireSuffixOnQuery } from './require-suffix-on-query/index.mjs';

export const rules = {
  'no-refer-types': noReferTypes,
  'require-by-id-suffix-on-query': requireByIdSuffixOnQuery,
  'require-non-nullable-on-list-query': requireNonNullableOnListQuery,
  'require-nullable-on-non-list-arguments-query': requireNullableOnNonListArgumentsQuery,
  'require-suffix-on-query': requireSuffixOnQuery,
  'require-union-result-on-mutation': requireUnionResultOnMutation,
};
