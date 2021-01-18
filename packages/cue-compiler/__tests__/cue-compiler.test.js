'use strict';

const cueCompiler = require('..');

describe('cue-compiler', () => {
  test('module mode preamble', () => {
    const code = 'function() {}';
    expect(code).toMatch('function() {}')
  })
});
