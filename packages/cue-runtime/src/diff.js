import patch from './patch';
import listDiff from './listDiff';
import { isString, each } from './utils';

function diff(oldTree, newTree) {
  var index = 0;
  var patches = {};
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
}

function dfsWalk(oldNode, newNode, index, patches) {
  var currentPatch = [];

  if (newNode === null) {
  } else if (isString(oldNode) && isString(newNode)) {
    if (newNode !== oldNode) {
      currentPatch.push({ type: patch.TEXT, content: newNode });
    }
  } else if (oldNode.tag === newNode.tag && oldNode.key === newNode.key) {
    var attrsPatches = diffAttrs(oldNode, newNode);

    if (attrsPatches) {
      currentPatch.push({ type: patch.PROPS, props: attrsPatches });
    }

    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
  } else {
    currentPatch.push({ type: patch.REPLACE, node: newNode });
  }

  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren, 'key');
  newChildren = diffs.children;

  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves };
    currentPatch.push(reorderPatch);
  }

  var leftNode = null;
  var currentNodeIndex = index;
  each(oldChildren, function (child, i) {
    var newChild = newChildren[i];
    currentNodeIndex =
      leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
    dfsWalk(child, newChild, currentNodeIndex, patches);
    leftNode = child;
  });
}

function diffAttrs(oldNode, newNode) {
  var count = 0;
  var oldAttrs = oldNode.attrs;
  var newAttrs = newNode.attrs;

  var key, value;
  var attrsPatches = {};

  for (key in oldAttrs) {
    if (key.startsWith('on-')) {
      continue;
    }
    value = oldAttrs[key];
    if (newAttrs[key] !== value) {
      count++;
      attrsPatches[key] = newAttrs[key];
    }
  }

  for (key in newAttrs) {
    if (key.startsWith('on-')) {
      continue;
    }
    value = newAttrs[key];
    if (!oldAttrs.hasOwnProperty(key)) {
      count++;
      attrsPatches[key] = newAttrs[key];
    }
  }

  if (count === 0) {
    return null;
  }

  return attrsPatches;
}

export default diff;
