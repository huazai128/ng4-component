import { Component,ViewEncapsulation,ViewChild,ComponentFactoryResolver,Input } from "@angular/core"; // ComponentFactoryResolver:组件工厂解析
import { DynamicDirective } from "../dynamic.directive"; // 用于动态组件的插入
import { AdItem,AdComponent } from "../dynamic.model"; //

@Component({
  selector:"app-ad",
  template: `
    <div class="ad-banner">
      <h3>动态组件</h3>
      <!-- 动态模版：根据不同模板显示 -->
      <ng-template ad-host></ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})

export class BannerComponent{

  @Input() ads:AdItem[]; // 广告数组

  public currentAddIndex:number = -1; //

  @ViewChild(DynamicDirective) adHost:DynamicDirective; // 用于操作指令

  public subscription: any;
  public interval:any; // 定时器

  // componentFactoryResolver:用componentFactoryResolver来解析每一个自组件
  constructor(private componentFactoryResolver:ComponentFactoryResolver){}

  // 视图加载
  ngAfterViewInit(){
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }

  public loadComponent(){

    this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;

    let adItem = this.ads[this.currentAddIndex];

    // 解析组件
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    //
    let viewContainerRef = this.adHost.viewContainerRef;

    // 清除组件
    viewContainerRef.clear();

    // 创建一个新的组件
    let componentRef = viewContainerRef.createComponent(componentFactory);
    // 数组注入；使用Input来获取这个属性值
    (<AdComponent>componentRef.instance).data = adItem.data
  }

  getAds(){
    this.interval = setInterval(() => {
      this.loadComponent();
    },3000)
  }
}

