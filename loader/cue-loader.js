const { tokenizer, parser, generate } = require("../dist");

module.exports = function (source) {
  const tokens = tokenizer(source);
  const ast = parser(tokens);
  const code = generate(ast);
  return `
  const {
    _creatElement,
    _createText,
    _string,
    _if,
    _withDirectives,
    _vShow,
    _vHide
  } = require("@/cue-runtime");
  module.exports = ${code}
  `;
}