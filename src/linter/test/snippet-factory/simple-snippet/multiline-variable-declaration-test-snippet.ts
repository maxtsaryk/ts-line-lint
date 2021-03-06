import { createMultilineString } from '../../../../utils/text-utils';

export const multilineVariableDeclarationSnippet = createMultilineString(
    '// non-blank line',
    '%BLANK_BEFORE%',
    'const someArray = [',
    '  "some long string",',
    '  "another long string",',
    '];',
    '%BLANK_AFTER%',
    '// non-blank line',
    '%BLANK_BEFORE%',
    'let someObject = {',
    '  key1: "value1",',
    '  key2: "value2",',
    '};',
    '%BLANK_AFTER%',
    '// non-blank line',
    '%BLANK_BEFORE%',
    '  var indentedObject = {',
    '    key1: "value1",',
    '    key2: "value2",',
    '  };',
    '%BLANK_AFTER%',
    '// non-blank line'
);
