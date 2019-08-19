const fs = require('fs');
const path = require('path');
const RuleTester = require('eslint').RuleTester;

const plugin = require('../..');

const ruleTester = new RuleTester({
    parser: require.resolve('babel-eslint'),
});

ruleTester.run('sort-imports', plugin.rules['sort-imports'], {
    valid: [
        {
            code: `import aaa from 'aaa';
                   import bbb from 'bbb';`
        },
        {
            code: `import A from './A.js';`
        },
        {
            code: `import * as A from './A.js';`
        },
        {
            code: `import A from './A.js';
                   import B from './B.js';`
        },
        {
            code: `import { A } from './A.js';
                   import B from './B.js';
                   import type X from './X.js'`
        }
    ],

    invalid: [
        {
            code: `import B from './B.js';
                   import A from './A.js';`,
            errors: [{ message: 'Imports should be sorted alphabetically.' }]
        },
        {
            code: `import type B from './B.js';
                   import A from './A.js';`,
            errors: [{ message: "Expected 'single' syntax before 'type' syntax." }]
        },
        {
            code: `import B from './B.js';
                   import { A } from './A.js';`,
            errors: [{ message: 'Imports should be sorted alphabetically.' }]
        },
        {
            code: `import B from './B.js';
                   import { C, A } from './AC.js';`,
            errors: [
                { message: "Expected 'multiple' syntax before 'single' syntax." },
                { message: "Member 'A' of the import declaration should be sorted alphabetically." }
            ]
        }
    ]
});
