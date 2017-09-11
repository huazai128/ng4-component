import { Directive,Input,Output,ElementRef } from "@angular/core";

import { MnFullPageOptions } from "./fullpage.model";
const DIRECTIVE_NAME = 'mnFullpage';

// 指令
@Directive({
  selector:'['+DIRECTIVE_NAME+']'
})

export class FullPageDirective{

  private static propertyPrefix:string = DIRECTIVE_NAME;

  @Input(DIRECTIVE_NAME) public options:MnFullPageOptions; // 获取组件的配置

  [key:string]:any;

  @Input() public mnFullpageMenu: string;
  @Input() public mnFullpageLockAnchors: boolean;
  @Input() public mnFullpageAnchors: Array<string>;
  @Input() public mnFullpageNavigation: boolean;
  @Input() public mnFullpageNavigationPosition: string;
  @Input() public mnFullpageNavigationTooltips: Array<string>;
  @Input() public mnFullpageShowActiveTooltip: boolean;
  @Input() public mnFullpageSlidesNavigation: boolean;
  @Input() public mnFullpageSlidesNavPosition: string;

  @Input() public mnFullpageCss3: boolean;
  @Input() public mnFullpageScrollingSpeed: number;
  @Input() public mnFullpageAutoScrolling: boolean;
  @Input() public mnFullpageFitToSection: boolean;
  @Input() public mnFullpageFitToSectionDelay: number;
  @Input() public mnFullpageScrollBar: boolean;
  @Input() public mnFullpageEasing: string;
  @Input() public mnFullpageEasingcss3: string;
  @Input() public mnFullpageLoopBottom: boolean;
  @Input() public mnFullpageLoopTop: boolean;
  @Input() public mnFullpageLoopHorizontal: boolean;
  @Input() public mnFullpageContinuousVertical: boolean;
  @Input() public mnFullpageNormalScrollElements: string;
  @Input() public mnFullpageScrollOverflow: boolean;
  @Input() public mnFullpageTouchSensitivity: number;
  @Input() public mnFullpageNormalScrollElementTouchThreshold: number;

  @Input() public mnFullpageKeyboardScrolling: boolean;
  @Input() public mnFullpageAnimateAnchor: boolean;
  @Input() public mnFullpageRecordHistory: boolean;

  @Input() public mnFullpageControlArrows: boolean;
  @Input() public mnFullpageVerticalCentered: boolean;
  @Input() public mnFullpageResize: boolean;
  @Input() public mnFullpageSectionsColor: Array<string>;
  @Input() public mnFullpagePaddingTop: string;
  @Input() public mnFullpagePaddingBottom: string;
  @Input() public mnFullpageFixedElements: string;
  @Input() public mnFullpageResponsiveWidth: number;
  @Input() public mnFullpageResponsiveHeight: number;
  @Input() public mnFullpageSectionSelector: string;
  @Input() public mnFullpageSlideSelector: string;


  @Input() public mnFullpageAfterLoad: (anchorLink: string, index: number) => void;
  @Input() public mnFullpageOnLeave: (index: number, nextIndex: number,
                                      direction: string) => void;
  @Input() public mnFullpageAfterRender: () => void;
  @Input() public mnFullpageAfterResize: () => void;
  @Input() public mnFullpageAfterSlideLoad: (anchorLink: string, index: number,
                                             slideAnchor: string, slideIndex: number) => void;
  @Input() public mnFullpageOnSlideLeave: (anchorLink: string,
                                           index: number, slideIndex: number, direction: string,
                                           nextSlideIndex: number) => void;

  constructor(private _el:ElementRef){
    // console.log($);
  }

  private static extractName(property:string){
    return property[ FullPageDirective.propertyPrefix.length].toLowerCase()
      + property.substring(FullPageDirective.propertyPrefix.length + 1);
  }

  ngOnInit():void{
    if(!this.options){
      this.options = new MnFullPageOptions();
    }
    for(const property of Object.keys(this)){
      // startsWith:方法用来判断当前字符串是否是以另外一个给定的子字符串“开头”的
      if(property.startsWith(FullPageDirective.propertyPrefix)){
        continue
      }
      const option = FullPageDirective.extractName(property);
      console.log(option);
      if(this.options[option]){
        console.log("进来了");
        continue;
      }
      console.log("出来了");
      this.options[option] = this[property];
    }
    (<any>$)(this._el.nativeElement).fullpage(this.options);
  }
}
