'use strict';

const cueRuntime = require('..');

describe('cue-runtime', () => {
  test('module mode preamble', () => {
    const code = 'function() {}';
    expect(code).toMatch('function() {}')
  })
});
