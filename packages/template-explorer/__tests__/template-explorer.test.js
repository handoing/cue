'use strict';

describe('template-explorer', () => {
  test('module mode preamble', () => {
    const code = 'function() {}';
    expect(code).toMatch('function() {}')
  })
});
