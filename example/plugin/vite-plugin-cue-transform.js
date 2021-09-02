const { tokenizerV2, parser, generateSnabb } = require("../../packages/cue-compiler");
const tplFileRegex = /\.tpl$/;

function compileFile(source) {
  const tokens = tokenizerV2(source);
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

module.exports = function cuePlugin() {
  return {
    name: 'cue-plugin',
    transform(src, id) {
      if (tplFileRegex.test(id)) {
        return {
          code: compileFile(src),
          map: null
        }
      }
    }
  }
}
