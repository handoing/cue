import Scanner from './scanner';

class Tokenizer {
  constructor(code) {
    this.scanner = new Scanner(code);
  }
  getNextToken() {
    if (!this.scanner.eof()) {
      let token = this.scanner.lex();
      if (token) {
        return token;
      }
    }
  }
}

function tokenizer(input) {
  const tokens = [];
  const tokenizer = new Tokenizer(input);

  try {
    while (true) {
      const token = tokenizer.getNextToken();
      if (!token) {
        break;
      }
      tokens.push(token);
    }
  } catch (e) {
    console.error(e);
  }

  return tokens;
}

export default tokenizer;