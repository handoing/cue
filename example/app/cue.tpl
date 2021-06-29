<div
  class="main"
>
  <img class="image" on-click={{this.onChange($event)}} src="{{img}}"/>
  <div class="toggle">toggle {{toggle}}</div>
  <ul>
    {{#list nnnn as item by item_index}}
    <li class="title">------</li>
    {{/list}}
  </ul>
</div>
