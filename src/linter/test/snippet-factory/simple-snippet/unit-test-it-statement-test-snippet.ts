import { createMultilineString } from '../../../../utils/text-utils';

export const unitTestItStatementSnippet = createMultilineString(
    'describe("test suite", () => {',
    '  // non-blank line',
    '%BLANK_BEFORE%',
    '  it("some test case", () => {',
    '    // arange + act',
    '',
    '    // expect...',
    '  });',
    '%BLANK_AFTER%',
    '  // non-blank line',
    '%BLANK_BEFORE%',
    '  it("asynchronous test case", async () => {',
    '    // await expect...',
    '  });',
    '%BLANK_AFTER%',
    '  // non-blank line',
    '%BLANK_BEFORE%',
    '  it("fake async test case", fakeAsync(() => {',
    '    // tick and then expect...',
    '  }));',
    '%BLANK_AFTER%',
    '  // non-blank line',
    '});'
);
