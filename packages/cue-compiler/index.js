import tokenizer from './src/tokenizer';
import tokenizerV2 from './src/tokenizer.v2';
import parser from './src/parser';
import transform from './src/transform';
import generate from './src/generate';
import generateSnabb from './src/generateSnabb';
import parse from './src/parse';

function compile(template) {
  const tokens = tokenizer(template);
  const ast = parser(tokens);
  const code = generate(ast);
  const dynamicFunction = new Function(`return ${code}`);
  return dynamicFunction();
}

function compileV2(template) {
  const tokens = tokenizerV2(template);
  const ast = parser(tokens);
  transform(ast);
  const code = generateSnabb(ast);
  const dynamicFunction = new Function(`return ${code}`);
  return dynamicFunction();
}

export { tokenizer, tokenizerV2, parser, generate, generateSnabb, compile, compileV2, parse };
