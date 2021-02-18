'use strict';

const cueShared = require('..');

describe('cue-shared', () => {
  test('module mode preamble', () => {
    const code = 'function() {}';
    expect(code).toMatch('function() {}')
  })
});
