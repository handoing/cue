<div
  class="main"
>
  <img class="image" on-click={{this.onChange($event)}} src="{{img}}"/>
  <div class="toggle">toggle {{toggle}}</div>
  {{#list nnnn as item by item_index}}
  <p class="title">------</p>
  {{/list}}
</div>