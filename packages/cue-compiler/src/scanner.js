import Character from './character';
import TokenType from './tokenType';

const DATA_STATE = 'DATA_STATE';
const TAG_OPEN_STATE = 'TAG_OPEN_STATE';
const TAG_NAME_STATE = 'TAG_NAME_STATE';
const TAG_CLOSE_STATE = 'TAG_CLOSE_STATE';
const BEFORE_ATTRIBUTE_NAME_STATE = 'BEFORE_ATTRIBUTE_NAME_STATE';
const ATTRIBUTE_NAME_STATE = 'ATTRIBUTE_NAME_STATE';
const BEFORE_ATTRIBUTE_VALUE_STATE = 'BEFORE_ATTRIBUTE_VALUE_STATE';
const ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE = 'ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE';
const AFTER_ATTRIBUTE_VALUE_QUOTED_STATE = 'AFTER_ATTRIBUTE_VALUE_QUOTED_STATE';
const ATTRIBUTE_VALUE_DOUBLE_BRACE_STATE = 'ATTRIBUTE_VALUE_DOUBLE_BRACE_STATE';
const AFTER_ATTRIBUTE_VALUE_BRACE_STATE = 'AFTER_ATTRIBUTE_VALUE_BRACE_STATE';
const TEXT_STATE = 'TEXT_STATE';
const IF_EXPRESSION_START = 'IF_EXPRESSION_START';
const IF_EXPRESSION = 'IF_EXPRESSION';
const IF_EXPRESSION_END = 'IF_EXPRESSION_END';
const FOR_EXPRESSION_START = 'FOR_EXPRESSION_START';
const FOR_EXPRESSION = 'FOR_EXPRESSION';
const FOR_EXPRESSION_END = 'FOR_EXPRESSION_END';

const prefixDirective = 'c-';

class Scanner {
  constructor(code) {
    this.source = code;

    this.length = code.length;
    this.index = 0;

    this.state = DATA_STATE;
    this.currentToken = null;
    this.currentAttr = null;
    this.buffer = [];
  }

  eof() {
    return this.index >= this.length;
  }

  lex() {
    while (!this.buffer.length && !this.eof()) {
      const cp = this.source.charCodeAt(this.index);
      this[this.state](cp, this.source[this.index]);
    }
    return this.buffer.shift();
  }

  peek(index) {
    return this.source.charCodeAt(this.index + index);
  }

  [DATA_STATE](cp) {
    if (Character.isWhiteSpace(cp) || cp === 10) { // \n
      ++this.index;
    } else if (cp === 60) { // <
      this.state = TAG_OPEN_STATE;
      ++this.index;
    } else if (Character.isLetter(cp)) {
      this._createTextToken();
      this.state = TEXT_STATE;
    } else if (cp === 123) { // {
      if ((this.peek(2) === 35 || this.peek(2) === 47) && this.peek(1) === 123) { // look # /
        this.index += 2;
      } else {
        this._createTextToken();
        this.state = TEXT_STATE;
      }
    } else if (cp === 35 || cp === 47) { // # /
      if ((this.peek(1) === 105 && this.peek(2) === 102) || this.peek(1) === 101) { // look if
        this.state = IF_EXPRESSION_START;
        ++this.index;
      } else if (this.peek(1) === 108 && this.peek(2) === 105) { // look li
        this.state = FOR_EXPRESSION_START;
        ++this.index;
      }
    }
  }

  [TEXT_STATE](cp, c) {
    if (Character.isChar(cp)) {
      this.currentToken.value += c;
      ++this.index;
    } else if (cp === 60) {
      this._emitCurrentToken();
      this.state = DATA_STATE;
    }
  }

  [TAG_CLOSE_STATE](cp) {
    if (Character.isLetter(cp)) {
      this._createEndTagToken();
      this.state = TAG_NAME_STATE;
    }
  }

  [TAG_OPEN_STATE](cp) {
    if (Character.isLetter(cp)) {
      this._createStartTagToken();
      this.state = TAG_NAME_STATE;
    } else if (this.source.charCodeAt(this.index) === 47) { // /
      this.state = TAG_CLOSE_STATE;
      ++this.index;
    }
  }

  [TAG_NAME_STATE](cp, c) {
    if (Character.isLetter(cp)) {
      this.currentToken.value += c;
      ++this.index;
    } else if (Character.isWhiteSpace(cp) || cp === 10) { // \n
      this.state = BEFORE_ATTRIBUTE_NAME_STATE;
      ++this.index;
    } else if (cp === 62) { // >
      this.state = DATA_STATE;
      ++this.index;
      this._emitCurrentToken();
    }
  }

  [BEFORE_ATTRIBUTE_NAME_STATE](cp) {
    if (Character.isLetter(cp)) {
      this._createAttr('');
      this.state = ATTRIBUTE_NAME_STATE;
    } else if (Character.isWhiteSpace(cp) || cp === 10 || cp === 9) { // \n \t
      ++this.index;
    }
  }

  [ATTRIBUTE_NAME_STATE](cp, c) {
    if (Character.isLetter(cp) || cp === 45) {
      this.currentAttr.name += c;
      ++this.index;
    } else if (cp === 61) { // =
      this.state = BEFORE_ATTRIBUTE_VALUE_STATE;
      ++this.index;
    }
  }

  [BEFORE_ATTRIBUTE_VALUE_STATE](cp) {
    if (cp === 34) { // "
      this.state = ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE;
      ++this.index;
    } else if (cp === 123 && this.peek(1) === 123) { // {
      this.state = ATTRIBUTE_VALUE_DOUBLE_BRACE_STATE;
      this.index += 2;
    }
  }

  [ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE](cp, c) {
    if (cp !== 34) {
      this.currentAttr.value += c;
      ++this.index;
    } else if (cp === 34) { // "
      if (this.currentAttr.name.indexOf(prefixDirective) === 0) {
        this.currentToken.directives.push(this.currentAttr)
      } else {
        this.currentToken.attrs.push(this.currentAttr)
      }
      this.state = AFTER_ATTRIBUTE_VALUE_QUOTED_STATE;
      ++this.index;
    }
  }

  [AFTER_ATTRIBUTE_VALUE_QUOTED_STATE](cp) {
    if (cp === 62) { // >
      this.state = DATA_STATE;
      ++this.index;
      this._emitCurrentToken();
    } else if (Character.isWhiteSpace(cp) || cp === 10 || cp === 9) {
      ++this.index;
    } else if (Character.isLetter(cp)) {
      this.state = BEFORE_ATTRIBUTE_NAME_STATE;
    } else if (cp === 47 || this.peek(1) === 62) { // />
      this.state = DATA_STATE;
      this.index += 2;
      this._emitCurrentCloseToken();
    }
  }

  [ATTRIBUTE_VALUE_DOUBLE_BRACE_STATE](cp, c) {
    if (cp !== 125) {
      this.currentAttr.value += c;
      ++this.index;
    } else if (cp === 125 && this.peek(1) === 125) { // }
      if (this.currentAttr.name.indexOf(prefixDirective) === 0) {
        this.currentToken.directives.push(this.currentAttr)
      } else {
        this.currentToken.attrs.push(this.currentAttr)
      }
      this.state = AFTER_ATTRIBUTE_VALUE_BRACE_STATE;
      this.index += 2;
    }
  }

  [AFTER_ATTRIBUTE_VALUE_BRACE_STATE](cp) {
    if (cp === 62) { // >
      this.state = DATA_STATE;
      ++this.index;
      this._emitCurrentToken();
    } else if (Character.isWhiteSpace(cp) || cp === 10 || cp === 9) {
      ++this.index;
    } else if (Character.isLetter(cp)) {
      this.state = BEFORE_ATTRIBUTE_NAME_STATE;
    }
  }

  [IF_EXPRESSION_START](cp) {
    if (cp === 105 || cp === 102) { // i or f
      ++this.index;
    } else if (Character.isWhiteSpace(cp)) {
      ++this.index;
    } else if (cp === 101) { // e
      this._createExpressionThenIf();
      this.state = IF_EXPRESSION;
    } else if (cp === 125) { // {
      this._createExpressionEndIf();
      this.state = IF_EXPRESSION;
    } else if (Character.isLetter(cp)) {
      this._createExpressionStartIf();
      this.state = IF_EXPRESSION;
    }
  }

  [IF_EXPRESSION](cp, c) {
    if (Character.isLetter(cp)) {
      this.currentToken.value += c;
      ++this.index;
    } else if (Character.isWhiteSpace(cp)) {
      ++this.index;
    } else if (cp === 125) { // }
      ++this.index;
      this.state = IF_EXPRESSION_END;
    }
  }

  [IF_EXPRESSION_END](cp, c) {
    if (cp === 125) { // }
      this.state = DATA_STATE;
      ++this.index;
      this._emitCurrentToken();
    }
  }

  [FOR_EXPRESSION_START](cp, c) {
    if (cp === 108 || cp === 105 || cp === 115 || cp === 116) { // list
      if (this.peek(1) === 105 && this.peek(2) === 115 && this.peek(3) === 116) {
        this.index += 4;
      }
    } else if (Character.isWhiteSpace(cp)) {
      ++this.index;
    } else if (cp === 125) { // {
      this._createExpressionEndFor();
      this.state = FOR_EXPRESSION;
    } else if (Character.isLetter(cp)) {
      this._createExpressionStartFor();
      this.state = FOR_EXPRESSION;
    }
  }

  [FOR_EXPRESSION](cp, c) {
    if (Character.isLetter(cp)) {
      this.currentToken.value += c;
      ++this.index;
    } else if (Character.isWhiteSpace(cp)) {
      this.currentToken.value += c;
      ++this.index;
    } else if (cp === 125) { // }
      ++this.index;
      this.state = FOR_EXPRESSION_END;
    }
  }

  [FOR_EXPRESSION_END](cp, c) {
    if (cp === 125) { // }
      this.state = DATA_STATE;
      ++this.index;
      this._emitCurrentToken();
    }
  }

  _emitCurrentToken() {
    const ct = this.currentToken;
    this.buffer.push(ct);
  }

  _emitCurrentCloseToken() {
    const currentTokenValue = this.currentToken.value;
    this._emitCurrentToken();
    this._createEndTagToken();
    this.currentToken.value = currentTokenValue;
    this._emitCurrentToken();
  }

  _createAttr(attrNameFirstCh) {
    this.currentAttr = {
      name: attrNameFirstCh,
      value: ''
    };
  }

  _createStartTagToken() {
    this.currentToken = {
      type: TokenType.START_TAG_TOKEN,
      value: '',
      attrs: [],
      directives: []
    };
  }

  _createEndTagToken() {
    this.currentToken = {
      type: TokenType.END_TAG_TOKEN,
      value: ''
    };
  }

  _createTextToken() {
    this.currentToken = {
      type: TokenType.CHARACTER_TOKEN,
      value: ''
    };
  }

  _createExpressionStartIf() {
    this.currentToken = {
      type: TokenType.EXP_START_IF_TOKEN,
      value: ''
    };
  }

  _createExpressionThenIf() {
    this.currentToken = {
      type: TokenType.EXP_THEN_IF_TOKEN,
      value: ''
    };
  }

  _createExpressionEndIf() {
    this.currentToken = {
      type: TokenType.EXP_END_IF_TOKEN,
      value: ''
    };
  }

  _createExpressionStartFor() {
    this.currentToken = {
      type: TokenType.EXP_START_FOR_TOKEN,
      value: ''
    };
  }

  _createExpressionEndFor() {
    this.currentToken = {
      type: TokenType.EXP_END_FOR_TOKEN,
      value: ''
    };
  }

}

export default Scanner;