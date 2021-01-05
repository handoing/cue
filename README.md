# cue

### 目标

渲染性能超越vue及regular。

[benchmarks](https://github.com/handoing/benchmarks)

### 流程图

![](./assets/cue.png)

### 运行

```bash
npm run pull:sub
npm install
npm start
```

### 使用

tpl:

```html
<div class="main">
  <p>{{name}}</p>
  {{#if showHello}}
    <p>hello</p>
  {{#else}}
    <p>yellow</p>
  {{/if}}
</div>
```

js:

```js
const app = new Cue({
  data: {
    name: 'gogogo',
    showHello: true
  },
  toggle() {
    this.setData({
      showHello: !this.data.showHello
    })
  }
});

app.mount(document.querySelector('#app'));
```

### 进度

compile:

- [x] 模板插值
- [x] 模板表达式
- [x] 模板事件
- [ ] 模板include
- [ ] 模板list
- [x] 模板if
- [ ] 过滤器
- [x] 指令
- [ ] 组件

runtime:

- [ ] 生命周期
- [ ] 内建api
- [ ] 过滤器
- [ ] 指令
- [ ] 组件
- [ ] 异步数据更新
- [ ] 虚拟dom diff