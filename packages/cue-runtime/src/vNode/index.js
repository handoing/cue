import { h } from 'snabbdom/build/package/h';
import { isString } from '../utils';

export function _creatElement(tag, attrs, children) {
  return {
    tag,
    attrs,
    children,
  };
}

export function _createVNode(vm, attrs, handle) {
  return vm.vNode;
}

export function _createText(text) {
  return text;
}

export function _string(text) {
  return text;
}

export function _if(check, f1, f2) {
  return check ? f1() : f2();
}

export function _for(list, handle) {
  return list.reduce(function (total, item, index) {
    return total.concat(handle(item, index));
  }, []);
}

export function _withDirectives(vNode, directives) {
  directives.map(([directive, directiveValue]) => {
    if (!isString(directive)) {
      return directive(vNode, directiveValue);
    }
    return;
  });
  return vNode;
}

export function _vShow(vNode, value) {
  // vNode.attrs.style = `display: ${value === 'true' ? 'block' : 'none'};`
}

export function _vHide(vNode, value) {
  // vNode.attrs.style = `display: ${value === 'true' ? 'none' : 'block'};`
}

export { h };
