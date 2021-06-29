const AST = {
  type: 'ROOT',
  children: [
    {
      type: 'ELEMENT',
      tag: 'div',
      tagType: 'ELEMENT',
      props: [
        {
          type: 'ATTRIBUTE',
          name: 'class',
          value: {
            type: 'TEXT',
            content: 'main',
            loc: {
              start: {
                column: 9,
                line: 3,
                offset: 14,
              },
              end: {
                column: 15,
                line: 3,
                offset: 20,
              },
              source: '"main"',
            },
          },
          loc: {
            start: {
              column: 3,
              line: 3,
              offset: 8,
            },
            end: {
              column: 15,
              line: 3,
              offset: 20,
            },
            source: 'class="main"',
          },
        },
      ],
      isSelfClosing: false,
      children: [
        {
          type: 'ELEMENT',
          tag: 'img',
          tagType: 'ELEMENT',
          props: [
            {
              type: 'ATTRIBUTE',
              name: 'class',
              value: {
                type: 'TEXT',
                content: 'image',
                loc: {
                  start: {
                    column: 14,
                    line: 5,
                    offset: 36,
                  },
                  end: {
                    column: 21,
                    line: 5,
                    offset: 43,
                  },
                  source: '"image"',
                },
              },
              loc: {
                start: {
                  column: 8,
                  line: 5,
                  offset: 30,
                },
                end: {
                  column: 21,
                  line: 5,
                  offset: 43,
                },
                source: 'class="image"',
              },
            },
            {
              type: 'ATTRIBUTE',
              name: 'on-click',
              value: {
                type: 'TEXT',
                content: '{{this.onChange($event)}}',
                loc: {
                  start: {
                    column: 31,
                    line: 5,
                    offset: 53,
                  },
                  end: {
                    column: 56,
                    line: 5,
                    offset: 78,
                  },
                  source: '{{this.onChange($event)}}',
                },
              },
              loc: {
                start: {
                  column: 22,
                  line: 5,
                  offset: 44,
                },
                end: {
                  column: 56,
                  line: 5,
                  offset: 78,
                },
                source: 'on-click={{this.onChange($event)}}',
              },
            },
            {
              type: 'ATTRIBUTE',
              name: 'src',
              value: {
                type: 'TEXT',
                content: '{{img}}',
                loc: {
                  start: {
                    column: 61,
                    line: 5,
                    offset: 83,
                  },
                  end: {
                    column: 70,
                    line: 5,
                    offset: 92,
                  },
                  source: '"{{img}}"',
                },
              },
              loc: {
                start: {
                  column: 57,
                  line: 5,
                  offset: 79,
                },
                end: {
                  column: 70,
                  line: 5,
                  offset: 92,
                },
                source: 'src="{{img}}"',
              },
            },
          ],
          isSelfClosing: true,
          children: [],
          loc: {
            start: {
              column: 3,
              line: 5,
              offset: 25,
            },
            end: {
              column: 72,
              line: 5,
              offset: 94,
            },
            source: '<img class="image" on-click={{this.onChange($event)}} src="{{img}}"/>',
          },
        },
        {
          type: 'ELEMENT',
          tag: 'div',
          tagType: 'ELEMENT',
          props: [
            {
              type: 'ATTRIBUTE',
              name: 'class',
              value: {
                type: 'TEXT',
                content: 'toggle',
                loc: {
                  start: {
                    column: 14,
                    line: 6,
                    offset: 108,
                  },
                  end: {
                    column: 22,
                    line: 6,
                    offset: 116,
                  },
                  source: '"toggle"',
                },
              },
              loc: {
                start: {
                  column: 8,
                  line: 6,
                  offset: 102,
                },
                end: {
                  column: 22,
                  line: 6,
                  offset: 116,
                },
                source: 'class="toggle"',
              },
            },
          ],
          isSelfClosing: false,
          children: [
            {
              type: 'TEXT',
              content: 'toggle ',
              loc: {
                start: {
                  column: 23,
                  line: 6,
                  offset: 117,
                },
                end: {
                  column: 30,
                  line: 6,
                  offset: 124,
                },
                source: 'toggle ',
              },
            },
            {
              type: 'INTERPOLATION',
              content: {
                type: 'SIMPLE_EXPRESSION',
                isStatic: false,
                constType: 'NOT_CONSTANT',
                content: 'toggle',
                loc: {
                  start: {
                    column: 32,
                    line: 6,
                    offset: 126,
                  },
                  end: {
                    column: 38,
                    line: 6,
                    offset: 132,
                  },
                  source: 'toggle',
                },
              },
              loc: {
                start: {
                  column: 30,
                  line: 6,
                  offset: 124,
                },
                end: {
                  column: 40,
                  line: 6,
                  offset: 134,
                },
                source: '{{toggle}}',
              },
            },
          ],
          loc: {
            start: {
              column: 3,
              line: 6,
              offset: 97,
            },
            end: {
              column: 46,
              line: 6,
              offset: 140,
            },
            source: '<div class="toggle">toggle {{toggle}}</div>',
          },
        },
        {
          type: 'TEXT',
          content: ' ',
          loc: {
            start: {
              column: 46,
              line: 6,
              offset: 140,
            },
            end: {
              column: 3,
              line: 7,
              offset: 143,
            },
            source: '\n  ',
          },
        },
        {
          type: 'CONTROL',
          content: {
            type: 'SIMPLE_EXPRESSION',
            isStatic: false,
            constType: 'NOT_CONSTANT',
            content: 'list nnnn as item by item_index',
            loc: {
              start: {
                column: 6,
                line: 7,
                offset: 146,
              },
              end: {
                column: 37,
                line: 7,
                offset: 177,
              },
              source: 'list nnnn as item by item_index',
            },
          },
          loc: {
            start: {
              column: 3,
              line: 7,
              offset: 143,
            },
            end: {
              column: 39,
              line: 7,
              offset: 179,
            },
            source: '{{#list nnnn as item by item_index}}',
          },
        },
        {
          type: 'TEXT',
          content: ' ',
          loc: {
            start: {
              column: 39,
              line: 7,
              offset: 179,
            },
            end: {
              column: 3,
              line: 8,
              offset: 182,
            },
            source: '\n  ',
          },
        },
        {
          type: 'ELEMENT',
          tag: 'p',
          tagType: 'ELEMENT',
          props: [
            {
              type: 'ATTRIBUTE',
              name: 'class',
              value: {
                type: 'TEXT',
                content: 'title',
                loc: {
                  start: {
                    column: 12,
                    line: 8,
                    offset: 191,
                  },
                  end: {
                    column: 19,
                    line: 8,
                    offset: 198,
                  },
                  source: '"title"',
                },
              },
              loc: {
                start: {
                  column: 6,
                  line: 8,
                  offset: 185,
                },
                end: {
                  column: 19,
                  line: 8,
                  offset: 198,
                },
                source: 'class="title"',
              },
            },
          ],
          isSelfClosing: false,
          children: [
            {
              type: 'TEXT',
              content: '------',
              loc: {
                start: {
                  column: 20,
                  line: 8,
                  offset: 199,
                },
                end: {
                  column: 26,
                  line: 8,
                  offset: 205,
                },
                source: '------',
              },
            },
          ],
          loc: {
            start: {
              column: 3,
              line: 8,
              offset: 182,
            },
            end: {
              column: 30,
              line: 8,
              offset: 209,
            },
            source: '<p class="title">------</p>',
          },
        },
        {
          type: 'TEXT',
          content: ' ',
          loc: {
            start: {
              column: 30,
              line: 8,
              offset: 209,
            },
            end: {
              column: 3,
              line: 9,
              offset: 212,
            },
            source: '\n  ',
          },
        },
        {
          type: 'CONTROL',
          content: {
            type: 'SIMPLE_EXPRESSION',
            isStatic: false,
            constType: 'NOT_CONSTANT',
            content: 'list',
            loc: {
              start: {
                column: 6,
                line: 9,
                offset: 215,
              },
              end: {
                column: 10,
                line: 9,
                offset: 219,
              },
              source: 'list',
            },
          },
          loc: {
            start: {
              column: 3,
              line: 9,
              offset: 212,
            },
            end: {
              column: 12,
              line: 9,
              offset: 221,
            },
            source: '{{/list}}',
          },
        },
      ],
      loc: {
        start: {
          column: 1,
          line: 2,
          offset: 1,
        },
        end: {
          column: 7,
          line: 10,
          offset: 228,
        },
        source:
          '<div\n  class="main"\n>\n  <img class="image" on-click={{this.onChange($event)}} src="{{img}}"/>\n  <div class="toggle">toggle {{toggle}}</div>\n  {{#list nnnn as item by item_index}}\n  <p class="title">------</p>\n  {{/list}}\n</div>',
      },
    },
  ],
  helpers: [],
  components: [],
  directives: [],
  hoists: [],
  imports: [],
  cached: 0,
  temps: 0,
  loc: {
    start: {
      column: 1,
      line: 1,
      offset: 0,
    },
    end: {
      column: 1,
      line: 11,
      offset: 229,
    },
    source:
      '\n<div\n  class="main"\n>\n  <img class="image" on-click={{this.onChange($event)}} src="{{img}}"/>\n  <div class="toggle">toggle {{toggle}}</div>\n  {{#list nnnn as item by item_index}}\n  <p class="title">------</p>\n  {{/list}}\n</div>\n',
  },
};

const directivesTransform = (function () {
  const directives = {
    'c-show': function (value) {
      return '_vShow';
    },
    'c-hide': function (value) {
      return '_vHide';
    },
  };

  return function (attrName, attrValue) {
    return directives[attrName] ? directives[attrName](attrValue) : `"${attrName}"`;
  };
})();

function serializeAttrs(attrs) {
  const serializeSting = Object.keys(attrs).reduce((serializeString, attrName, index) => {
    switch (true) {
      case /^class$/.test(attrName): {
        let value = attrs[attrName];
        return (serializeString += `class: {${value}: true},`);
      }
      case /^on-/.test(attrName): {
        let eventName = attrName.slice(3);
        let value = attrs[attrName];
        value = value.replace(/this/g, '_ctx');
        return (serializeString += `on: { ${eventName}: function($event) { ${value} } },`);
      }
      default: {
        let value = attrs[attrName];
        return (serializeString += `props: {${attrName}: ${createText(`"${value}"`, {
          isAnalysisEvent: true,
        })}},`);
      }
    }
  }, '');

  // {
  //   class: { active: true, selected: false },
  //   attrs: { href: '/foo' },
  //   props: {
  //     href: '/bar'
  //   },
  //   on: {
  //     click: someFn
  //   },
  //   style: {
  //     fontWeight: 'bold'
  //   }
  // }
  return `{ ${serializeSting} }`;
}

function serializeDirectives(directives) {
  const serializeSting = Object.keys(directives).reduce((serializeSting, attrName, index) => {
    const key = directivesTransform(attrName, directives[attrName]);
    const value = directives[attrName];
    return (serializeSting += `[${key}, ${createText(value)}],`);
  }, '');
  return `[ ${serializeSting} ]`;
}

function createText(text, { isAnalysisEvent } = {}) {
  const match = text.match(/\{\{(.+?)\}\}/);
  if (match) {
    const prefix = match.input.substring(0, match.index);
    const suffix = match.input.substring(match.index + match[0].length, match.input.length);
    const _t = `${prefix}" + _string(_ctx.data.${match[1]}) + "${suffix}`;
    return isAnalysisEvent ? _t : `"${_t}"`;
  } else {
    return isAnalysisEvent ? text : `"${text}"`;
  }
}

function generateCode(node, index) {
  const prefix = index === 0 ? '' : ',';

  if (node.type === 'TEXT') {
    return `${prefix}_createText(${node.content})`;
  }
  if (node.type === 'INTERPOLATION') {
    return `${prefix}_string(_ctx.data.${node.content.content})`;
  }

  if (node.type === 'ELEMENT') {
    const hasAttrs = node.props.length > 0;
    const hasDirectives = false;
    const attrs = {};
    let createTagGenerateCode = '';

    if (hasAttrs) {
      node.props.map(({ name, value }) => {
        attrs[name] = value.content;
      });
    }

    if (node.isComponent) {
      createTagGenerateCode = `createComponentNode(resolveComponent('${
        node.name
      }'), ${serializeAttrs(attrs)}, function() { return []; })`;
    } else {
      createTagGenerateCode = `h('${node.tag}', ${serializeAttrs(attrs)}, [ ${
        node.children ? traversal(node.children) : ''
      } ])`;
    }

    if (hasDirectives) {
      node.directives.map(({ name, value }) => {
        directives[name] = value;
      });
      createTagGenerateCode = `_withDirectives(${createTagGenerateCode}, ${serializeDirectives(
        directives
      )})`;
    }

    return `${prefix} ${createTagGenerateCode}`;
  }

  if (node.type === 'CONTROL') {
    return `${prefix}_if(_ctx.data.${node.expression}, function() { return ${
      node.if ? traversal(node.if) : '[]'
    } }, function() { return ${node.else ? traversal(node.else) : '[]'} })`;
  }

  if (node.type === 'if') {
    return `${prefix}_if(_ctx.data.${node.expression}, function() { return ${
      node.if ? traversal(node.if) : '[]'
    } }, function() { return ${node.else ? traversal(node.else) : '[]'} })`;
  }

  if (node.type === 'for') {
    const [valueName, itemName, keyIndex] = node.expression.split(/ as | by /g);
    return `${prefix}..._for(_ctx.data.${valueName}, function(${itemName}, ${keyIndex}) { return [ ${
      node.children ? traversal(node.children) : ''
    } ] })`;
  }
}

function traversal(nodes) {
  return nodes
    .map(function (node, i) {
      return generateCode(node, i);
    })
    .join('');
}

function generateSnabb(ast, options) {
  let code = traversal(ast.children);
  return `function create(_ctx) { return ${code} }`;
}

console.log(generateSnabb(AST));

// export default generateSnabb;
