import tokenizer from './src/tokenizer';
import parser from './src/parser';
import transform from './src/transform';
import generate from './src/generate';
import generateSnabb from './src/generateSnabb';
import parse from './src/parse';

// function compile(template) {
//   const ast = parse(template);
//   transform(ast);
//   return generate(ast);
// }

function compile(template) {
  const tokens = tokenizer(template);
  const ast = parser(tokens);
  const code = generate(ast);
  const dynamicFunction = new Function(`return ${code}`);
  return dynamicFunction();
}

export { tokenizer, parser, generate, generateSnabb, compile, parse };
