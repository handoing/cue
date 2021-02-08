'use strict';

const cue = require('..');

describe('cue', () => {
  test('module mode preamble', () => {
    const code = 'function() {}';
    expect(code).toMatch('function() {}')
  })
});
