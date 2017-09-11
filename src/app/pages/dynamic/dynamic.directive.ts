import { Directive,ViewContainerRef } from "@angular/core";//ViewContainerRef用于动态添加组件的元素的视图容器；
//  ViewContainerRef:用于动态组件在那里插入，
@Directive({
  selector:"[ad-host]"
})
export class DynamicDirective{
  constructor(public viewContainerRef:ViewContainerRef){}
}
