import tokenizer from './src/tokenizer';
import parser from './src/parser';
import transform from './src/transform';
import generate from './src/generate';
import generateSnabb from './src/generateSnabb';
import baseParse from './src/parseChildren';

function compile(template) {
  const tokens = tokenizer(template);
  const ast = parser(tokens);
  const code = generate(ast);
  const dynamicFunction = new Function(`return ${code}`);
  return dynamicFunction();
}

export { tokenizer, parser, generate, generateSnabb, compile, baseParse };
