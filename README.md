# cue
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Target

Lightweight high performance MVVM framework（[benchmarks](https://github.com/handoing/benchmarks)）

## Flowsheet

![](./assets/cue.png)

## Start

```bash
git clone https://github.com/handoing/cue
cd cue/
# 安装依赖 (项目使用pnpm进行包管理，请先安装pnpm，详见：https://pnpm.io/)
pnpm install

# 启动示例
pnpm run:example

# 启动示例
pnpm run:template-explorer

# 项目构建
pnpm build:all

# 测试
pnpm test
```

## Usage

tpl:

```html
<div
  class="main"
>
  <img class="image" on-click={{this.onChange($event)}} src="{{img}}"/>
  <div class="toggle">toggle {{toggle}}</div>
</div>
```

js:

```js
export default {
  data: {
    toggle: true,
    img: 'https://avatars.githubusercontent.com/u/9876343',
    nnnn: new Array(10).fill('')
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

## Progress

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
- [ ] 实例属性与方法
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
  - [ ] 全局组件
  - [ ] 局部组件
- [x] 虚拟dom diff
- [ ] 异步数据更新
- [ ] 插件机制

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/iiiiiii7"><img src="https://avatars.githubusercontent.com/u/9876343?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Double Han</b></sub></a><br /><a href="https://github.com/handoing/cue/commits?author=handoing" title="Code">💻</a> <a href="https://github.com/handoing/cue/commits?author=handoing" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!