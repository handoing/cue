# cue

### 目标

极致的渲染性能（[benchmarks](https://github.com/handoing/benchmarks)）

### 流程图

![](./assets/cue.png)

### 运行

```bash
#初始化子模块
npm run init:sub

#拉取子模块
npm run pull:sub

#安装依赖
npm install

#启动示例
npm run example
```

### 使用

tpl:

```html
<div
  class="main"
>
  <img class="image" on-click={{this.onChange($event)}} src="{{img}}"/>
  <div class="toggle">toggle {{toggle}}</div>
  <span class="icon"></span>
</div>
```

js:

```js
module.exports = {
  data: {
    toggle: true,
    img: 'https://hao8.qhimg.com/t01c413c779df7eeecb.jpg'
  },
  created() {
    console.log('created');
  },
  updated() {
    console.log('updated');
  },
  mounted() {
    console.log('mounted');
  },
  destroyed() {
    console.log('destroyed');
  },
  onChange(e) {
    this.setData({
      toggle: !this.data.toggle
    })
  }
};
```

### 进度

compile:

- [x] 模板插值
- [x] 模板表达式
- [x] 模板事件
- [x] 模板if
- [x] 模板list
- [ ] 模板include
- [ ] 过滤器
  - [ ] 自定义过滤器
- [ ] 指令
  - [x] c-show
  - [x] c-hide
  - [ ] c-class
  - [ ] c-html
  - [ ] c-model
  - [ ] c-style
  - [ ] 自定义指令
- [ ] 组件

runtime:

- [x] 生命周期
  - [x] created
  - [x] updated
  - [x] mounted
  - [x] destroyed
- [ ] 内建api
- [ ] 过滤器
  - [ ] 自定义过滤器
- [ ] 指令
  - [x] c-show
  - [x] c-hide
  - [ ] c-class
  - [ ] c-html
  - [ ] c-model
  - [ ] c-style
  - [ ] 自定义指令
- [x] 事件
- [ ] 组件
- [ ] 插件机制
- [ ] 异步数据更新
- [x] 虚拟dom diff