/**
 * tsconfig.json  added rule
 * "jsx":"react" -- Transform JSX into React code
 * "module":"ESNext" -- Generate modern JS modules for our library
 * "moduleResolution":"node" -- Follow node.js rules for finding modules
 * "declaration":true -- Output a `.d.ts` file for our library types
 * "declarationDir": "types" -- Where to replace `.d.ts` file
 * "emitDeclarationOnly":true -- Don't generate JS(rollup will do that) only export type declaration
 * "sourceMap":true -- Mapping JS code back to its TS file origins for debugging
 * "outDir":"dist" -- Directory where the project will be generated
 * "allowSyntheticDefaultImports":true -- Assumes default exports if node are created manually
 */

/**
 * @rollup/plugin-node-resolve Uses the node resolution algorithm for modules
 * @rollup/plugin-typescript Teacher rollup how to process TypeScript files
 * @rollup/plugin-commonjs Convert commonjs to ES6 modules
 * @rollup-plugin-dts rollup your `.d.ts` file
 */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
