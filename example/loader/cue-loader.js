const { tokenizer, parser, generate, generateSnabb } = require("../../packages/cue-compiler");

module.exports = function (source) {
  const tokens = tokenizer(source);
  const ast = parser(tokens);
  const code = generateSnabb(ast);
  return `
  import {
    h,
    _creatElement,
    _createText,
    _string,
    _if,
    _for,
    _withDirectives,
    _vShow,
    _vHide
  } from 'cue';
  export default ${code};
  `;
}
