const { tokenizer, parser, generate, generateSnabb } = require("../dist");

module.exports = function (source) {
  const tokens = tokenizer(source);
  const ast = parser(tokens);
  const code = generateSnabb(ast);
  return `
  const {
    h,
    _creatElement,
    _createText,
    _string,
    _if,
    _for,
    _withDirectives,
    _vShow,
    _vHide
  } = require("@/cue-runtime");
  module.exports = ${code}
  `;
}