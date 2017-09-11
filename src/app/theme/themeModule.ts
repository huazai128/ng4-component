import { NgModule,ModuleWithProviders } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// 组件
import { NgSwiper,QuillEditorComponent } from "./component";
const NGA_COMPONENTS = [
  NgSwiper,
  QuillEditorComponent
]

// 指令
import {
  NgUploadDirective,
  FileUploadService,
  NgUploadDrop,
  FullPageDirective,
  FullpageService
 } from "./directive";
const NGA_DIRECTIVES = [
  NgUploadDirective,
  NgUploadDrop,
  FullPageDirective
]

// 服务
const NGA_SERVICES = [
  FileUploadService,
  FullpageService
]

@NgModule({
  imports:[
    FormsModule,
    CommonModule
  ],
  declarations:[
    ...NGA_COMPONENTS,
    ...NGA_DIRECTIVES
  ],
  exports:[
    ...NGA_COMPONENTS,
    ...NGA_DIRECTIVES
  ]
})

export class ThemeModule{
  static forRoot():ModuleWithProviders{
    return <ModuleWithProviders>{
      ngModule:ThemeModule,
      providers:[ // 提供外部访问服务
        ...NGA_SERVICES
      ]
    }
}
}

