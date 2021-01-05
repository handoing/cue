const { tokenizer, parser, generate } = require("../packages/cue-parser");

module.exports = function (source) {
  const tokens = tokenizer(source);
  const ast = parser(tokens);
  const code = generate(ast);
  return `module.exports = ${code}`;
}