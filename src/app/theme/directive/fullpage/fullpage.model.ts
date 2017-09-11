// 配置文档
export class MnFullPageOptions{

  [key:string]:any;

  public menu:string; // 绑定菜单，设定的相关属性与 anchors 的值对应后，菜单可以控制滚动

  public lockAnchors:boolean;

  public anchors:Array<string>; // 定义锚链接

  public navigation:boolean; // 是否显示导航

  public navigationPosition:string; // 导航位置

  public navigationTooltips:Array<string>; // 项目导航的 tip

  public showActiveTooltip:boolean;

  public slidesNavigation:boolean; // 是否显示左右滑块的项目导航

  public slidesNavPosition:string; // 左右滑块的项目导航的位置

  public controlArrowColor:string; // 控制箭头颜色

  public css3:boolean; // 是否使用css3 transform效果

  public scrollingSpeed:number; // 滚动速度

  public autoScrolling:boolean; // 是否自动滚动

  public fitToSection:boolean; //

  public fitToSectionDelay:number;

  public scrollBar:boolean;

  public easing:string;  // 动画方式

  public easingcss3: string;

  public loopBottom: boolean; // 滚动条到底部是否循环

  public loopTop:boolean; // 滚动条到顶部是否循环

  public loopHorizontal:boolean; // 左右滑块是否循环滑动

  public continuousVertical:boolean; // 是否循环滚动，与 loopTop 及 loopBottom 不兼容

  public normalScrollElements:string;

  public scrollOverflow:boolean; // 内容超过满屏后是否显示滚动条

  public touchSensitivity:number; //

  public normalScrollElementTouchThreshold:number;

  public keyboardScrolling:boolean; // 是否使用键盘控制continuousVertical

  public animateAnchor:boolean;

  public recordHistory: boolean;

  public controlArrows:boolean;

  public verticalCentered:boolean; // 内容是否垂直居中

  public resize:boolean; // 字体是否随着窗口缩放而缩放

  public sectionsColor:Array<string>;

  public paddingTop: string; // 	与顶部的距离

  public paddingBottom:string; // 与底部距离

  public fixedElements:string; //

  public responsiveWidth:number;

  public responsiveHeight:number;

  public sectionSelector:string;

  public slideSelector:string;

  public afterLoad:(anchorLink:string,index:number) => void;

  public onLeave:(index:number,nextIndex:number,direction:string) => void;

  public afterRender:() => void;

  public afterResize:() => void;

  public afterSlideLoad: (anchorLink: string, index: number,
                          slideAnchor: string, slideIndex: number) => void;


  public onSlideLeave: (anchorLink: string, index: number, slideIndex: number,
                        direction: string, nextSlideIndex: number) => void;


  constructor(options?: Object) {
    if (options) {
      (<any>Object).assign(this, options);
    }
  }




}
