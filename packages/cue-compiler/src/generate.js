
const eventsFilter = (function() {
  const events = {
    'on-click': function(value) {
      value = value.replace(/this/g, '_ctx');
      return `function($event) { ${value} }`;
    }
  };

  return function(attrName, attrValue) {
    return events[attrName] ? events[attrName](attrValue) : `"${attrValue}"`;
  }
})()

const directivesTransform = (function() {
  const directives = {
    'c-show': function(value) {
      return '_vShow';
    },
    'c-hide': function(value) {
      return '_vHide';
    }
  };

  return function(attrName, attrValue) {
    return directives[attrName] ? directives[attrName](attrValue) : `"${attrName}"`;
  }
})()

function serializeAttrs(attrs) {
  const serializeSting = Object.keys(attrs).reduce((serializeSting, attrName, index) => {
    const key = `"${attrName}"`;
    const value = eventsFilter(attrName, attrs[attrName]);
    return serializeSting += `${key}: ${createText(value, { isAnalysisEvent: true })},`
  }, '')
  return `{ ${serializeSting} }`;
}

function serializeDirectives(directives) {
  const serializeSting = Object.keys(directives).reduce((serializeSting, attrName, index) => {
    const key = directivesTransform(attrName, directives[attrName]);
    const value = directives[attrName];
    return serializeSting += `[${key}, ${createText(value)}],`
  }, '')
  return `[ ${serializeSting} ]`;
}

function createText(text, { isAnalysisEvent } = {}) {
  const match = text.match(/\{\{(.+?)\}\}/);
  if (match) {
    const prefix = match.input.substring(0, match.index);
    const suffix = match.input.substring(match.index + match[0].length, match.input.length);
    const _t = `${prefix}" + _string(_ctx.data.${match[1]}) + "${suffix}`
    return isAnalysisEvent ? _t : `"${_t}"`
  } else {
    return isAnalysisEvent ? text : `"${text}"`;
  }
}

function generateCode(node, index) {
  const prefix = index === 0 ? '' : ',';

  if (node.type === 'text') {
    return `${prefix}_createText(${createText(node.data)})`
  }

  if (node.type === 'tag') {
    const hasAttrs = node.attrs.length > 0;
    const hasDirectives = node.directives.length > 0;
    const attrs = {};
    const directives = {};
    let createTagGenerateCode = '';

    if (hasAttrs) {
      node.attrs.map(({ name, value }) => {
        attrs[name] = value;
      })
    }

    createTagGenerateCode = `_creatElement('${node.name}', ${serializeAttrs(attrs)}, [ ${ node.children ? traversal(node.children) : '' } ])`;

    if (hasDirectives) {
      node.directives.map(({ name, value }) => {
        directives[name] = value;
      })
      createTagGenerateCode = `_withDirectives(${createTagGenerateCode}, ${serializeDirectives(directives)})`
    }

    return `${prefix} ${createTagGenerateCode}`
  }

  if (node.type === 'if') {
    return `${prefix}_if(_ctx.data.${node.expression}, function() { return ${ node.if ? traversal(node.if) : '[]' } }, function() { return ${ node.else ? traversal(node.else) : '[]' } })`
  }

  if (node.type === 'for') {
    const [ valueName, itemName, keyIndex ] = node.expression.split(/ as | by /g)
    return `${prefix}_for(_ctx.data.${valueName}, function(${itemName}, ${keyIndex}) { return [ ${ node.children ? traversal(node.children) : '' } ] })`
  }
}

function traversal(nodes) {
  return nodes.map(function(node, i) {
    return generateCode(node, i)
  }).join('');
}

function generate(ast, options) {
  let code = traversal(ast);
  return `function create(_ctx) { return ${code} }`
}

export default generate;