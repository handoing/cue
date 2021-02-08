import { setAttribute, each, toArray } from './utils';

const REPLACE = 0;
const REORDER = 1;
const PROPS = 2;
const TEXT = 3;

function patch(node, patches) {
  var walker = {
    index: 0,
  };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
  var currentPatches = patches[walker.index];

  var len = node.childNodes ? node.childNodes.length : 0;
  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }

  if (currentPatches) {
    applyPatches(node, currentPatches);
  }
}

function applyPatches(node, currentPatches) {
  each(currentPatches, function (currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        var newNode =
          typeof currentPatch.node === 'string'
            ? document.createTextNode(currentPatch.node)
            : currentPatch.node.render();
        node.parentNode.replaceChild(newNode, node);
        break;
      case REORDER:
        reorderChildren(node, currentPatch.moves);
        break;
      case PROPS:
        setProps(node, currentPatch.props);
        break;
      case TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content;
        } else {
          node.nodeValue = currentPatch.content;
        }
        break;
      default:
        throw new Error('Unknown patch type ' + currentPatch.type);
    }
  });
}

function reorderChildren(node, moves) {
  var staticNodeList = toArray(node.childNodes);
  var maps = {};

  each(staticNodeList, function (node) {
    if (node.nodeType === 1) {
      var key = node.getAttribute('key');
      if (key) {
        maps[key] = node;
      }
    }
  });

  each(moves, function (move) {
    var index = move.index;
    if (move.type === 0) {
      if (staticNodeList[index] === node.childNodes[index]) {
        node.removeChild(node.childNodes[index]);
      }
      staticNodeList.splice(index, 1);
    } else if (move.type === 1) {
      var insertNode = maps[move.item.key]
        ? maps[move.item.key].cloneNode(true)
        : typeof move.item === 'object'
        ? move.item.render()
        : document.createTextNode(move.item);
      staticNodeList.splice(index, 0, insertNode);
      node.insertBefore(insertNode, node.childNodes[index] || null);
    }
  });
}

function setProps(node, props) {
  for (var key in props) {
    var value = props[key];
    setAttribute(node, key, value);
  }
}

patch.REPLACE = REPLACE;
patch.REORDER = REORDER;
patch.PROPS = PROPS;
patch.TEXT = TEXT;

export default patch;
