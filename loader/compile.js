const { tokenizer, parser, generate } = require("../packages/cue-parser");

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
  } = require("../packages/cue-runtime");
  module.exports = ${code}
  `;
}