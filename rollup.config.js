import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import run from '@rollup/plugin-run';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const isDev = process.env.NODE_ENV === 'development';

const pkg = require('./package.json');
const bundle = Object.keys(pkg.dependencies || {});

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: './lib',
      chunkFileNames: 'index.esm.js',
      entryFileNames: 'index.esm.js',
      format: 'esm',
      sourcemap: false
    },
    {
      dir: './lib',
      chunkFileNames: 'index.js',
      entryFileNames: 'index.js',
      format: 'cjs',
      sourcemap: true
    }
  ],

  watch: {
    include: 'src/**'
  },
  external: (id) => {
    return !id.startsWith('.') && !path.isAbsolute(id) && !bundle.includes(id);
  },

  plugins: [
    resolve(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.json'
    }),
    isDev && run(),
    replace({
      __DEV__: isDev
    }),
    sourceMaps(),
    commonjs(),
    !isDev &&
      terser({
        output: { comments: 'all' },
        compress: {
          keep_infinity: true,
          pure_getters: true,
          passes: 10
        },
        ecma: 5,
        warnings: true,
        mangle: {
          reserved: ['Canvas']
        }
      })
  ]
};
