// import _render from './src/render';
// import _diff from './src/diff';
// import _patch from './src/patch';

import { init } from 'snabbdom/build/package/init';
import { classModule } from 'snabbdom/build/package/modules/class';
import { propsModule } from 'snabbdom/build/package/modules/props';
import { styleModule } from 'snabbdom/build/package/modules/style';
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners';
import { clone } from 'cue-shared';

const patch = init([classModule, propsModule, styleModule, eventListenersModule]);
class Cue {
  constructor({ script, css, tpl, render }) {
    this.render = render;
    this._ctx = this.initContext(clone(script));
    this._created();
  }

  initContext(instance) {
    instance.setData = (data) => {
      const _ctx = this._ctx;
      this.data = Object.assign(_ctx.data, data);
      const vNode = this.render(_ctx);

      console.log('new node: ', vNode);
      console.log('old node: ', this.vNode);

      // _patch(this.root, _diff(this.vNode, vNode));
      patch(this.vNode, vNode);
      this.vNode = vNode;

      this._ctx.updated && this._ctx.updated();
    };
    return instance;
  }

  _created() {
    this.vNode = this.render(this._ctx);
    this._ctx.created && this._ctx.created();
  }

  mount(root) {
    this.root = root;
    // _render(this.vNode, this.root);
    patch(this.root, this.vNode);
    this._ctx.mounted && this._ctx.mounted();
    return this;
  }

  destroy() {
    this.root.innerHTML = '';
    this._ctx.destroyed && this._ctx.destroyed();
  }
}

function createApp(options) {
  return new Cue(options);
}

export { Cue, createApp };
export * from './src/vNode/index';
export * from './src/component';
