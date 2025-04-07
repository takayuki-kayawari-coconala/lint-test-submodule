import { parser, processors } from '@graphql-eslint/eslint-plugin';
import { configs } from './configs/index.mjs';
import { rules } from './rules/index.mjs';

export { parser, processors, rules, configs };

export default {
  configs,
  parser,
  processors,
  rules,
};
