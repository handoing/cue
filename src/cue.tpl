<div
  class="main"
>
  <img class="image" on-click={{this.onChange($event)}} src="{{img}}"/>
  <div class="toggle">toggle {{toggle}}</div>
  <div c-show="{{isShow}}">ooooo</div>
  <span class="icon"></span>
</div>