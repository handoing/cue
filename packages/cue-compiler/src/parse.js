const isArray = Array.isArray;
const extend = Object.assign;

const ConstantTypes = {
  NOT_CONSTANT: 'NOT_CONSTANT',
  CAN_SKIP_PATCH: 'CAN_SKIP_PATCH',
  CAN_HOIST: 'CAN_HOIST',
  CAN_STRINGIFY: 'CAN_STRINGIFY',
};

const ErrorCodes = {
  ABRUPT_CLOSING_OF_EMPTY_COMMENT: 'ABRUPT_CLOSING_OF_EMPTY_COMMENT',
  CDATA_IN_HTML_CONTENT: 'CDATA_IN_HTML_CONTENT',
  DUPLICATE_ATTRIBUTE: 'DUPLICATE_ATTRIBUTE',
  END_TAG_WITH_ATTRIBUTES: 'END_TAG_WITH_ATTRIBUTES',
  END_TAG_WITH_TRAILING_SOLIDUS: 'END_TAG_WITH_TRAILING_SOLIDUS',
  EOF_BEFORE_TAG_NAME: 'EOF_BEFORE_TAG_NAME',
  EOF_IN_CDATA: 'EOF_IN_CDATA',
  EOF_IN_COMMENT: 'EOF_IN_COMMENT',
  EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT: 'EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT',
  EOF_IN_TAG: 'EOF_IN_TAG',
  INCORRECTLY_CLOSED_COMMENT: 'INCORRECTLY_CLOSED_COMMENT',
  INCORRECTLY_OPENED_COMMENT: 'INCORRECTLY_OPENED_COMMENT',
  INVALID_FIRST_CHARACTER_OF_TAG_NAME: 'INVALID_FIRST_CHARACTER_OF_TAG_NAME',
  MISSING_ATTRIBUTE_VALUE: 'MISSING_ATTRIBUTE_VALUE',
  MISSING_END_TAG_NAME: 'MISSING_END_TAG_NAME',
  MISSING_WHITESPACE_BETWEEN_ATTRIBUTES: 'MISSING_WHITESPACE_BETWEEN_ATTRIBUTES',
  NESTED_COMMENT: 'NESTED_COMMENT',
  UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME: 'UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME',
  UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE:
    'UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE',
  UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME: 'UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME',
  UNEXPECTED_NULL_CHARACTER: 'UNEXPECTED_NULL_CHARACTER',
  UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME: 'UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME',
  UNEXPECTED_SOLIDUS_IN_TAG: 'UNEXPECTED_SOLIDUS_IN_TAG',

  X_INVALID_END_TAG: 'X_INVALID_END_TAG',
  X_MISSING_END_TAG: 'X_MISSING_END_TAG',
  X_MISSING_INTERPOLATION_END: 'X_MISSING_INTERPOLATION_END',
  X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END: 'X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END',

  X_V_IF_NO_EXPRESSION: 'X_V_IF_NO_EXPRESSION',
  X_V_IF_SAME_KEY: 'X_V_IF_SAME_KEY',
  X_V_ELSE_NO_ADJACENT_IF: 'X_V_ELSE_NO_ADJACENT_IF',
  X_V_FOR_NO_EXPRESSION: 'X_V_FOR_NO_EXPRESSION',
  X_V_FOR_MALFORMED_EXPRESSION: 'X_V_FOR_MALFORMED_EXPRESSION',
  X_V_FOR_TEMPLATE_KEY_PLACEMENT: 'X_V_FOR_TEMPLATE_KEY_PLACEMENT',
  X_V_BIND_NO_EXPRESSION: 'X_V_BIND_NO_EXPRESSION',
  X_V_ON_NO_EXPRESSION: 'X_V_ON_NO_EXPRESSION',
  X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET: 'X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET',
  X_V_SLOT_MIXED_SLOT_USAGE: 'X_V_SLOT_MIXED_SLOT_USAGE',
  X_V_SLOT_DUPLICATE_SLOT_NAMES: 'X_V_SLOT_DUPLICATE_SLOT_NAMES',
  X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN: 'X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN',
  X_V_SLOT_MISPLACED: 'X_V_SLOT_MISPLACED',
  X_V_MODEL_NO_EXPRESSION: 'X_V_MODEL_NO_EXPRESSION',
  X_V_MODEL_MALFORMED_EXPRESSION: 'X_V_MODEL_MALFORMED_EXPRESSION',
  X_V_MODEL_ON_SCOPE_VARIABLE: 'X_V_MODEL_ON_SCOPE_VARIABLE',
  X_INVALID_EXPRESSION: 'X_INVALID_EXPRESSION',
  X_KEEP_ALIVE_INVALID_CHILDREN: 'X_KEEP_ALIVE_INVALID_CHILDREN',

  X_PREFIX_ID_NOT_SUPPORTED: 'X_PREFIX_ID_NOT_SUPPORTED',
  X_MODULE_MODE_NOT_SUPPORTED: 'X_MODULE_MODE_NOT_SUPPORTED',
  X_CACHE_HANDLER_NOT_SUPPORTED: 'X_CACHE_HANDLER_NOT_SUPPORTED',
  X_SCOPE_ID_NOT_SUPPORTED: 'X_SCOPE_ID_NOT_SUPPORTED',

  __EXTEND_POINT__: '__EXTEND_POINT__',
};

const TagType = {
  Start: 'Start',
  End: 'End',
};

const ElementTypes = {
  ELEMENT: 'ELEMENT',
  COMPONENT: 'COMPONENT',
  SLOT: 'SLOT',
  TEMPLATE: 'TEMPLATE',
};

const TextModes = {
  DATA: 'DATA',
  RCDATA: 'RCDATA',
  RAWTEXT: 'RAWTEXT',
  CDATA: 'CDATA',
  ATTRIBUTE_VALUE: 'ATTRIBUTE_VALUE',
};

const NodeTypes = {
  ROOT: 'ROOT',
  ELEMENT: 'ELEMENT',
  TEXT: 'TEXT',
  COMMENT: 'COMMENT',
  SIMPLE_EXPRESSION: 'SIMPLE_EXPRESSION',
  INTERPOLATION: 'INTERPOLATION',
  CONTROL: 'CONTROL',
  ATTRIBUTE: 'ATTRIBUTE',
  DIRECTIVE: 'DIRECTIVE',

  COMPOUND_EXPRESSION: 'COMPOUND_EXPRESSION',
  IF: 'IF',
  IF_BRANCH: 'IF_BRANCH',
  FOR: 'FOR',
  TEXT_CALL: 'TEXT_CALL',

  VNODE_CALL: 'VNODE_CALL',
  JS_CALL_EXPRESSION: 'JS_CALL_EXPRESSION',
  JS_OBJECT_EXPRESSION: 'JS_OBJECT_EXPRESSION',
  JS_PROPERTY: 'JS_PROPERTY',
  JS_ARRAY_EXPRESSION: 'JS_ARRAY_EXPRESSION',
  JS_FUNCTION_EXPRESSION: 'JS_FUNCTION_EXPRESSION',
  JS_CONDITIONAL_EXPRESSION: 'JS_CONDITIONAL_EXPRESSION',
  JS_CACHE_EXPRESSION: 'JS_CACHE_EXPRESSION',

  JS_BLOCK_STATEMENT: 'JS_BLOCK_STATEMENT',
  JS_TEMPLATE_LITERAL: 'JS_TEMPLATE_LITERAL',
  JS_IF_STATEMENT: 'JS_IF_STATEMENT',
  JS_ASSIGNMENT_EXPRESSION: 'JS_ASSIGNMENT_EXPRESSION',
  JS_SEQUENCE_EXPRESSION: 'JS_SEQUENCE_EXPRESSION',
  JS_RETURN_STATEMENT: 'JS_RETURN_STATEMENT',
};

function createParserContext(content, options) {
  return {
    options,
    column: 1,
    line: 1,
    offset: 0,
    originalSource: content,
    source: content,
    inPre: false,
    inVPre: false,
  };
}

function createRoot(children, loc) {
  return {
    type: NodeTypes.ROOT,
    children,
    helpers: [],
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: 0,
    temps: 0,
    codegenNode: undefined,
    loc,
  };
}

function getCursor(context) {
  const { column, line, offset } = context;
  return { column, line, offset };
}

function parse(content, options) {
  const context = createParserContext(content, options);
  const start = getCursor(context);
  return createRoot(parseChildren(context, TextModes.DATA, []), getSelection(context, start));
}

function parseChildren(context, mode, ancestors) {
  const nodes = [];
  while (!isEnd(context, mode, ancestors)) {
    const s = context.source;
    let node;
    if (mode === TextModes.DATA || mode === TextModes.RCDATA) {
      if (!context.inVPre && startsWith(s, context.options.delimiters[0])) {
        if (
          startsWith(s, `${context.options.delimiters[0]}#`) ||
          startsWith(s, `${context.options.delimiters[0]}/`)
        ) {
          node = parseControlStatement(context, mode);
        } else {
          node = parseInterpolation(context, mode);
        }
      } else if (mode === TextModes.DATA && s[0] === '<') {
        if (s[1] === '/') {
          if (s[2] === '>') {
            emitError(context, ErrorCodes.MISSING_END_TAG_NAME, 2);
            advanceBy(context, 3);
            continue;
          } else if (/[a-z]/i.test(s[2])) {
            emitError(context, ErrorCodes.X_INVALID_END_TAG);
            parseTag(context, TagType.End, parent);
            continue;
          } else {
            emitError(context, ErrorCodes.INVALID_FIRST_CHARACTER_OF_TAG_NAME, 2);
            node = parseBogusComment(context);
          }
        } else if (/[a-z]/i.test(s[1])) {
          node = parseElement(context, ancestors);
        } else {
          emitError(context, ErrorCodes.INVALID_FIRST_CHARACTER_OF_TAG_NAME, 1);
        }
      }
    }

    if (!node) {
      node = parseText(context, mode);
    }

    if (isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        pushNode(nodes, node[i]);
      }
    } else {
      pushNode(nodes, node);
    }
  }

  let removedWhitespace = false;
  if (mode !== TextModes.RAWTEXT) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!context.inPre && node.type === NodeTypes.TEXT) {
        if (!/[^\t\r\n\f ]/.test(node.content)) {
          const prev = nodes[i - 1];
          const next = nodes[i + 1];
          if (
            !prev ||
            !next ||
            prev.type === NodeTypes.COMMENT ||
            next.type === NodeTypes.COMMENT ||
            (prev.type === NodeTypes.ELEMENT &&
              next.type === NodeTypes.ELEMENT &&
              /[\r\n]/.test(node.content))
          ) {
            removedWhitespace = true;
            nodes[i] = null;
          } else {
            node.content = ' ';
          }
        } else {
          node.content = node.content.replace(/[\t\r\n\f ]+/g, ' ');
        }
      }
      if (node.type === NodeTypes.COMMENT && !context.options.comments) {
        removedWhitespace = true;
        nodes[i] = null;
      }
    }
    if (context.inPre && parent && context.options.isPreTag(parent.tag)) {
      const first = nodes[0];
      if (first && first.type === NodeTypes.TEXT) {
        first.content = first.content.replace(/^\r?\n/, '');
      }
    }
  }

  return removedWhitespace ? nodes.filter(Boolean) : nodes;
}

function parseBogusComment(context) {
  const start = getCursor(context);
  const contentStart = context.source[1] === '?' ? 1 : 2;
  let content;

  const closeIndex = context.source.indexOf('>');
  if (closeIndex === -1) {
    content = context.source.slice(contentStart);
    advanceBy(context, context.source.length);
  } else {
    content = context.source.slice(contentStart, closeIndex);
    advanceBy(context, closeIndex + 1);
  }

  return {
    type: NodeTypes.COMMENT,
    content,
    loc: getSelection(context, start),
  };
}

function parseElement(context, ancestors) {
  const wasInPre = context.inPre;
  const wasInVPre = context.inVPre;
  const parent = last(ancestors);
  const element = parseTag(context, TagType.Start, parent);
  const isPreBoundary = context.inPre && !wasInPre;
  const isVPreBoundary = context.inVPre && !wasInVPre;

  if (element.isSelfClosing || context.options.isVoidTag(element.tag)) {
    return element;
  }

  ancestors.push(element);
  const mode = context.options.getTextMode(element, parent);
  const children = parseChildren(context, mode, ancestors);
  ancestors.pop();

  element.children = children;

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End, parent);
  } else {
    emitError(context, ErrorCodes.X_MISSING_END_TAG, 0, element.loc.start);
    if (context.source.length === 0 && element.tag.toLowerCase() === 'script') {
      const first = children[0];
      if (first && startsWith(first.loc.source, '<!--')) {
        emitError(context, ErrorCodes.EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT);
      }
    }
  }

  element.loc = getSelection(context, element.loc.start);

  if (isPreBoundary) {
    context.inPre = false;
  }
  if (isVPreBoundary) {
    context.inVPre = false;
  }
  return element;
}

function parseTag(context, type, parent) {
  const start = getCursor(context);
  const match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source);
  const tag = match[1];

  advanceBy(context, match[0].length);
  advanceSpaces(context);

  let props = parseAttributes(context, type);

  let isSelfClosing = false;
  if (context.source.length === 0) {
    emitError(context, ErrorCodes.EOF_IN_TAG);
  } else {
    isSelfClosing = startsWith(context.source, '/>');
    if (type === TagType.End && isSelfClosing) {
      emitError(context, ErrorCodes.END_TAG_WITH_TRAILING_SOLIDUS);
    }
    advanceBy(context, isSelfClosing ? 2 : 1);
  }

  let tagType = ElementTypes.ELEMENT;
  const options = context.options;
  if (!context.inVPre && !options.isCustomElement(tag)) {
    const hasVIs = props.some((p) => p.type === NodeTypes.DIRECTIVE && p.name === 'is');
    if (options.isNativeTag && !hasVIs) {
      if (!options.isNativeTag(tag)) tagType = ElementTypes.COMPONENT;
    } else if (
      hasVIs ||
      isCoreComponent(tag) ||
      (options.isBuiltInComponent && options.isBuiltInComponent(tag)) ||
      /^[A-Z]/.test(tag) ||
      tag === 'component'
    ) {
      tagType = ElementTypes.COMPONENT;
    }

    if (tag === 'slot') {
      tagType = ElementTypes.SLOT;
    } else if (
      tag === 'template' &&
      props.some((p) => {
        return p.type === NodeTypes.DIRECTIVE && isSpecialTemplateDirective(p.name);
      })
    ) {
      tagType = ElementTypes.TEMPLATE;
    }
  }

  return {
    type: NodeTypes.ELEMENT,
    tag,
    tagType,
    props,
    isSelfClosing,
    children: [],
    loc: getSelection(context, start),
    codegenNode: undefined,
  };
}

function isCoreComponent() {
  return false;
}

function isSpecialTemplateDirective() {
  return false;
}

function parseInterpolation(context, mode) {
  const [open, close] = context.options.delimiters;

  const closeIndex = context.source.indexOf(close, open.length);
  if (closeIndex === -1) {
    emitError(context, ErrorCodes.X_MISSING_INTERPOLATION_END);
    return undefined;
  }

  const start = getCursor(context);
  advanceBy(context, open.length);
  const innerStart = getCursor(context);
  const innerEnd = getCursor(context);
  const rawContentLength = closeIndex - open.length;
  const rawContent = context.source.slice(0, rawContentLength);
  const preTrimContent = parseTextData(context, rawContentLength, mode);
  const content = preTrimContent.trim();
  const startOffset = preTrimContent.indexOf(content);
  if (startOffset > 0) {
    advancePositionWithMutation(innerStart, rawContent, startOffset);
  }
  const endOffset = rawContentLength - (preTrimContent.length - content.length - startOffset);
  advancePositionWithMutation(innerEnd, rawContent, endOffset);
  advanceBy(context, close.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      isStatic: false,
      constType: ConstantTypes.NOT_CONSTANT,
      content,
      loc: getSelection(context, innerStart, innerEnd),
    },
    loc: getSelection(context, start),
  };
}

function parseControlStatement(context, mode) {
  const [open, close] = context.options.delimiters;
  const openLength = open.length + 1;

  const closeIndex = context.source.indexOf(close, openLength);
  if (closeIndex === -1) {
    emitError(context, ErrorCodes.X_MISSING_INTERPOLATION_END);
    return undefined;
  }

  const start = getCursor(context);
  advanceBy(context, openLength);
  const innerStart = getCursor(context);
  const innerEnd = getCursor(context);
  const rawContentLength = closeIndex - openLength;
  const rawContent = context.source.slice(0, rawContentLength);
  const preTrimContent = parseTextData(context, rawContentLength, mode);
  const content = preTrimContent.trim();
  const startOffset = preTrimContent.indexOf(content);
  if (startOffset > 0) {
    advancePositionWithMutation(innerStart, rawContent, startOffset);
  }
  const endOffset = rawContentLength - (preTrimContent.length - content.length - startOffset);
  advancePositionWithMutation(innerEnd, rawContent, endOffset);
  advanceBy(context, close.length);

  return {
    type: NodeTypes.CONTROL,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      isStatic: false,
      constType: ConstantTypes.NOT_CONSTANT,
      content,
      loc: getSelection(context, innerStart, innerEnd),
    },
    loc: getSelection(context, start),
  };
}

function parseAttributes(context, type) {
  const props = [];
  const attributeNames = new Set();
  while (
    context.source.length > 0 &&
    !startsWith(context.source, '>') &&
    !startsWith(context.source, '/>')
  ) {
    if (startsWith(context.source, '/')) {
      emitError(context, ErrorCodes.UNEXPECTED_SOLIDUS_IN_TAG);
      advanceBy(context, 1);
      advanceSpaces(context);
      continue;
    }
    if (type === TagType.End) {
      emitError(context, ErrorCodes.END_TAG_WITH_ATTRIBUTES);
    }

    const attr = parseAttribute(context, attributeNames);
    if (type === TagType.Start) {
      props.push(attr);
    }

    if (/^[^\t\r\n\f />]/.test(context.source)) {
      emitError(context, ErrorCodes.MISSING_WHITESPACE_BETWEEN_ATTRIBUTES);
    }
    advanceSpaces(context);
  }
  return props;
}

function parseAttribute(context, nameSet) {
  const start = getCursor(context);
  const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source);
  const name = match[0];

  if (nameSet.has(name)) {
    emitError(context, ErrorCodes.DUPLICATE_ATTRIBUTE);
  }
  nameSet.add(name);

  if (name[0] === '=') {
    emitError(context, ErrorCodes.UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME);
  }
  {
    const pattern = /["'<]/g;
    let m;
    while ((m = pattern.exec(name))) {
      emitError(context, ErrorCodes.UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME, m.index);
    }
  }

  advanceBy(context, name.length);

  let value = undefined;

  if (/^[\t\r\n\f ]*=/.test(context.source)) {
    advanceSpaces(context);
    advanceBy(context, 1);
    advanceSpaces(context);
    value = parseAttributeValue(context);
    if (!value) {
      emitError(context, ErrorCodes.MISSING_ATTRIBUTE_VALUE);
    }
  }
  const loc = getSelection(context, start);

  if (!context.inVPre && /^(v-|:|@|#)/.test(name)) {
    const match = /(?:^v-([a-z0-9-]+))?(?:(?::|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(name);

    const dirName =
      match[1] || (startsWith(name, ':') ? 'bind' : startsWith(name, '@') ? 'on' : 'slot');

    let arg;

    if (match[2]) {
      const isSlot = dirName === 'slot';
      const startOffset = name.indexOf(match[2]);
      const loc = getSelection(
        context,
        getNewPosition(context, start, startOffset),
        getNewPosition(
          context,
          start,
          startOffset + match[2].length + ((isSlot && match[3]) || '').length
        )
      );
      let content = match[2];
      let isStatic = true;

      if (content.startsWith('[')) {
        isStatic = false;

        if (!content.endsWith(']')) {
          emitError(context, ErrorCodes.X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END);
        }

        content = content.substr(1, content.length - 2);
      } else if (isSlot) {
        content += match[3] || '';
      }

      arg = {
        type: NodeTypes.SIMPLE_EXPRESSION,
        content,
        isStatic,
        constType: isStatic ? ConstantTypes.CAN_STRINGIFY : ConstantTypes.NOT_CONSTANT,
        loc,
      };
    }

    if (value && value.isQuoted) {
      const valueLoc = value.loc;
      valueLoc.start.offset++;
      valueLoc.start.column++;
      valueLoc.end = advancePositionWithClone(valueLoc.start, value.content);
      valueLoc.source = valueLoc.source.slice(1, -1);
    }

    return {
      type: NodeTypes.DIRECTIVE,
      name: dirName,
      exp: value && {
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: value.content,
        isStatic: false,
        constType: ConstantTypes.NOT_CONSTANT,
        loc: value.loc,
      },
      arg,
      modifiers: match[3] ? match[3].substr(1).split('.') : [],
      loc,
    };
  }

  return {
    type: NodeTypes.ATTRIBUTE,
    name,
    value: value && {
      type: NodeTypes.TEXT,
      content: value.content,
      loc: value.loc,
    },
    loc,
  };
}

function parseAttributeValue(context) {
  const start = getCursor(context);
  let content;

  const quote = context.source[0];
  const isQuoted = quote === `"` || quote === `'`;
  if (isQuoted) {
    advanceBy(context, 1);

    const endIndex = context.source.indexOf(quote);
    if (endIndex === -1) {
      content = parseTextData(context, context.source.length, TextModes.ATTRIBUTE_VALUE);
    } else {
      content = parseTextData(context, endIndex, TextModes.ATTRIBUTE_VALUE);
      advanceBy(context, 1);
    }
  } else {
    const match = /^[^\t\r\n\f >]+/.exec(context.source);
    if (!match) {
      return undefined;
    }
    const unexpectedChars = /["'<=`]/g;
    let m;
    while ((m = unexpectedChars.exec(match[0]))) {
      emitError(context, ErrorCodes.UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE, m.index);
    }
    content = parseTextData(context, match[0].length, TextModes.ATTRIBUTE_VALUE);
  }

  return { content, isQuoted, loc: getSelection(context, start) };
}

function getNewPosition(context, start, numberOfCharacters) {
  return advancePositionWithClone(
    start,
    context.originalSource.slice(start.offset, numberOfCharacters),
    numberOfCharacters
  );
}

function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
  return advancePositionWithMutation(extend({}, pos), source, numberOfCharacters);
}

function parseText(context, mode) {
  const endTokens = ['<', context.options.delimiters[0]];
  if (mode === TextModes.CDATA) {
    endTokens.push(']]>');
  }

  let endIndex = context.source.length;
  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1);
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }

  const start = getCursor(context);
  const content = parseTextData(context, endIndex, mode);

  return {
    type: NodeTypes.TEXT,
    content,
    loc: getSelection(context, start),
  };
}

function parseTextData(context, length, mode) {
  const rawText = context.source.slice(0, length);
  advanceBy(context, length);
  if (mode === TextModes.RAWTEXT || mode === TextModes.CDATA || rawText.indexOf('&') === -1) {
    return rawText;
  } else {
    return context.options.decodeEntities(rawText, mode === TextModes.ATTRIBUTE_VALUE);
  }
}

function advanceBy(context, numberOfCharacters) {
  const { source } = context;
  advancePositionWithMutation(context, source, numberOfCharacters);
  context.source = source.slice(numberOfCharacters);
}

function advanceSpaces(context) {
  const match = /^[\t\r\n\f ]+/.exec(context.source);
  if (match) {
    advanceBy(context, match[0].length);
  }
}

export function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
  let linesCount = 0;
  let lastNewLinePos = -1;
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10 /* newline char code */) {
      linesCount++;
      lastNewLinePos = i;
    }
  }

  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column =
    lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;

  return pos;
}

function getSelection(context, start, end) {
  end = end || getCursor(context);
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset),
  };
}

function pushNode(nodes, node) {
  if (node.type === NodeTypes.TEXT) {
    const prev = last(nodes);
    if (prev && prev.type === NodeTypes.TEXT && prev.loc.end.offset === node.loc.start.offset) {
      prev.content += node.content;
      prev.loc.end = node.loc.end;
      prev.loc.source += node.loc.source;
      return;
    }
  }

  nodes.push(node);
}

function last(xs) {
  return xs[xs.length - 1];
}

function emitError(context, code, offset, loc = getCursor(context)) {
  if (offset) {
    loc.offset += offset;
    loc.column += offset;
  }
  console.log(`Error: ${code}, ${JSON.stringify(loc)}, ${context.source}`);
}

function isEnd(context, mode, ancestors) {
  const s = context.source;
  switch (mode) {
    case TextModes.DATA:
      if (startsWith(s, '</')) {
        for (let i = ancestors.length - 1; i >= 0; --i) {
          if (startsWithEndTagOpen(s, ancestors[i].tag)) {
            return true;
          }
        }
      }
      break;
    case TextModes.RCDATA:
    case TextModes.RAWTEXT: {
      const parent = last(ancestors);
      if (parent && startsWithEndTagOpen(s, parent.tag)) {
        return true;
      }
      break;
    }
    case TextModes.CDATA:
      if (startsWith(s, ']]>')) {
        return true;
      }
      break;
  }

  return !s;
}

function startsWith(source, searchString) {
  return source.startsWith(searchString);
}

function startsWithEndTagOpen(source, tag) {
  return (
    startsWith(source, '</') &&
    source.substr(2, tag.length).toLowerCase() === tag.toLowerCase() &&
    /[\t\r\n\f />]/.test(source[2 + tag.length] || '>')
  );
}

export default parse;
