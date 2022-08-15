import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import path from 'path';

import packageJson from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      postcss({
        extensions: ['.css', '.scss'],
        inject: true,
        plugins: [
          postcssUrl([
            {
              url: 'inline',
              maxSize: 10, // KB
              fallback: 'copy',
              basePath: path.resolve(__dirname, 'src')
            }
          ])
        ]
      }),
      copy({
        targets: [
          { src: 'src/theme/variables.scss', dest: 'lib', rename: 'colors.scss' }
        ]
      })
    ]
  },
  {
    input: 'dist/dts/index.d.ts',
    output: [
      {
        file: packageJson.types,
        format: 'es'
      }
    ],
    external: [/\.scss$/],
    plugins: [
      dts()
    ]
  }
];
