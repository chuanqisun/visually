import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'dist/testing/all-tests.js',
    format: 'iife',
    external: [ 'chai', 'mocha' ],
    globals: {
        chai: 'chai'
    },
    plugins: [ 
        resolve(),
        commonjs(),
    ],
    dest: 'dist/testing/all-tests.bundle.js' // equivalent to --output
};