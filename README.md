# cue

![](./assets/cue.png)

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