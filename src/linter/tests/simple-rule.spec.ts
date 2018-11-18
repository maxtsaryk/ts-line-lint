import { EMPTY_RULES_CONFIG, LineLintConfig } from '../../config/line-lint-config';
import { SimpleRuleName } from '../rules';
import { expectLinterWithConfig } from './linter-expects';
import { createMockConfig, getPatternDescription } from './linter-test-utils';
import { simpleTestSnippetMap } from './test-snippet-map';

export function simpleRuleTestSuite(ruleName: SimpleRuleName): void {
    const noBlanksAround = simpleTestSnippetMap[ruleName];
    const blanksAround = createSnippetWithBlanksAround();
    const blanksOnlyAfter = createSnippetWithBlanksOnlyAfter();
    const blanksOnlyBefore = createSnippetWithBlanksOnlyBefore();
    const patternDescription = getPatternDescription(ruleName);
    let config: LineLintConfig;

    describe('is not specified', () => {

        it('should only apply cleanup replacements', () => {
            expectLinterWithConfig(EMPTY_RULES_CONFIG).toOnlyApplyCleanupReplacementsTo(blanksAround);
            expectLinterWithConfig(EMPTY_RULES_CONFIG).toOnlyApplyCleanupReplacementsTo(noBlanksAround);
        });

    });

    describe('has option "remove: none"', () => {

        beforeEach(() => {
            config = createMockConfig(ruleName, 'remove', 'none');
        });

        it('should only apply cleanup replacements', () => {
            expectLinterWithConfig(config).toOnlyApplyCleanupReplacementsTo(blanksAround);
            expectLinterWithConfig(config).toOnlyApplyCleanupReplacementsTo(noBlanksAround);
        });

    });

    describe('has option "remove: before"', () => {

        beforeEach(() => {
            config = createMockConfig(ruleName, 'remove', 'before');
        });

        it(`should remove blank lines before each ${patternDescription}`, () => {
            expectLinterWithConfig(config).toConvert(blanksAround).to(blanksOnlyAfter);
        });

    });

    describe('has option "remove: after"', () => {

        beforeEach(() => {
            config = createMockConfig(ruleName, 'remove', 'after');
        });

        it(`should remove blank lines after each ${patternDescription}`, () => {
            expectLinterWithConfig(config).toConvert(blanksAround).to(blanksOnlyBefore);
        });

    });

    describe('has option "remove: both"', () => {

        beforeEach(() => {
            config = createMockConfig(ruleName, 'remove', 'both');
        });

        it(`should remove blank lines both before and after each ${patternDescription}`, () => {
            expectLinterWithConfig(config).toConvert(blanksAround).to(noBlanksAround);
        });

    });

    describe('has option "insert: none"', () => {

        beforeEach(() => {
            config = createMockConfig(ruleName, 'insert', 'none');
        });

        it('should only apply cleanup replacements', () => {
            expectLinterWithConfig(config).toOnlyApplyCleanupReplacementsTo(blanksAround);
            expectLinterWithConfig(config).toOnlyApplyCleanupReplacementsTo(noBlanksAround);
        });

    });

    describe('has option "insert: before"', () => {

        beforeEach(() => {
            config = createMockConfig(ruleName, 'insert', 'before');
        });

        it(`should insert a blank line before each ${patternDescription}`, () => {
            expectLinterWithConfig(config).toConvert(noBlanksAround).to(blanksOnlyBefore);
        });

    });

    describe('has option "insert: after"', () => {

        beforeEach(() => {
            config = createMockConfig(ruleName, 'insert', 'after');
        });

        it(`should insert a blank line after each ${patternDescription}`, () => {
            expectLinterWithConfig(config).toConvert(noBlanksAround).to(blanksOnlyAfter);
        });

    });

    describe('has option "insert: both"', () => {

        beforeEach(() => {
            config = createMockConfig(ruleName, 'insert', 'both');
        });

        it(`should insert blank lines both before and after each ${patternDescription}`, () => {
            expectLinterWithConfig(config).toConvert(noBlanksAround).to(blanksAround);
        });

    });

    describe('has both "remove" and "insert" options', () => {

        beforeEach(() => {
            config = {
                ...EMPTY_RULES_CONFIG,
                rules: { [ruleName]: { remove: 'both', insert: 'after' } },
            };
        });

        it('should first apply the removal and then the insertion', () => {
            expectLinterWithConfig(config).toConvert(blanksAround).to(blanksOnlyAfter);
        });

    });

    function createSnippetWithBlanksAround(): string {
        if (hasTopLevelPlaceholderLines()) {
            return simpleTestSnippetMap[ruleName].replace(/(\/\/ non-blank line)/g, '\n$1\n').slice(1, -1);
        } else {
            return simpleTestSnippetMap[ruleName]
                .replace(/((?<!{\n)  \/\/ non-blank line)/g, '\n$1')
                .replace(/(  \/\/ non-blank line(?!\n}))/g, '$1\n');
        }
    }

    function createSnippetWithBlanksOnlyAfter(): string {
        if (hasTopLevelPlaceholderLines()) {
            return simpleTestSnippetMap[ruleName].replace(/(\/\/ non-blank line)/g, '\n$1').slice(1);
        } else {
            return simpleTestSnippetMap[ruleName].replace(/((?<!{\n)  \/\/ non-blank line)/g, '\n$1');

        }
    }

    function createSnippetWithBlanksOnlyBefore(): string {
        if (hasTopLevelPlaceholderLines()) {
            return simpleTestSnippetMap[ruleName].replace(/(\/\/ non-blank line)/g, '$1\n').slice(0, -1);
        } else {
            return simpleTestSnippetMap[ruleName].replace(/(  \/\/ non-blank line(?!\n}))/g, '$1\n');
        }
    }

    function hasTopLevelPlaceholderLines(): boolean {
        return /^\/\/ non-blank line\n/.test(simpleTestSnippetMap[ruleName]);
    }

}