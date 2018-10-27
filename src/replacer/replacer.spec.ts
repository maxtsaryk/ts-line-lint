import { cleanupTestSuite } from './tests/cleanup.spec';
import { consecutiveImportsRuleTestSuite } from './tests/consecutive-imports.spec';
import { individualImportRuleTestSuite } from './tests/individual-import.spec';

describe('Replacer', () => {
    describe('always at the end of a replacement pipeline', cleanupTestSuite);
    describe('when "individual-import" rule', individualImportRuleTestSuite);
    describe('when "consecutive-imports" rule', consecutiveImportsRuleTestSuite);
    describe('when "individual-multiline-type-alias" rule', individualMultilineTypeAliasRuleTestSuite);
});