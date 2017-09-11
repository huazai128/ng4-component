import { Component,Input,ElementRef, ChangeDetectorRef,ViewEncapsulation } from "@angular/core";
const Swiper = require("swiper");

@Component({
  selector:"ng4-swiper",
  templateUrl:"./ng4-swiper.html",
  styles:[`
    :host{display:block}
    :host > div { width: 100%;height:100%}
  `],
  encapsulation:ViewEncapsulation.None
})

export class NgSwiper{

  @Input() config:any; // 配置
  @Input() set initialize(value:boolean){
    this.shouldInitialize = this.initialized ? false : value;
  }

  Swiper:any;

  private swiperWrapper:any; //
  private slideCount = 0;  // slide个数
  private initialized = false; //
  private shouldInitialize = true; //

  constructor(private el:ElementRef,
              private changeDetectorRef:ChangeDetectorRef){}
  ngOnInit(){
    console.log(this.el.nativeElement); // 指向当前组件元素；
  }

  // 视图初始化后调用
  ngAfterViewInit() {
    if(this.shouldInitialize){
      this.setup();
    }
  }

  // 用于检测组件视图和子视图；
  ngAfterViewChecked() {
    if (this.shouldInitialize) { //
      this.setup();
    }
    // 判断
    if (this.swiperWrapper && this.slideCount !== this.swiperWrapper.childElementCount) {
      this.slideCount = this.swiperWrapper.childElementCount;
      this.Swiper.update();
    }
  }

  //
  setup(){
    if(!this.Swiper){
      if(this.el.nativeElement.querySelector){ // 判断组件是否调用了；
        this.swiperWrapper = this.el.nativeElement.querySelector(".swiper-wrapper"); // 获取当前组件下的.swiper-wrapper的元素
        this.slideCount = this.swiperWrapper.childElementCount; // 获取.swiper-wrapper下子元素的个数
        this.Swiper = new Swiper(this.el.nativeElement.querySelector("ng4-swiper > div"),this.config);
        this.changeDetectorRef.detectChanges();  // 检测子元素的变化
      }
      this.shouldInitialize = false;
    }
  }
}
