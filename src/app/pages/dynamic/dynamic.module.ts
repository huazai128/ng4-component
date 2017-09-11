import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./dynamic.routing";

import { DynamicComponent } from "./dynamic.component";
import { DynamicDirective } from "./dynamic.directive";
import { DynamicService } from "./dynamic.service";
import { HeroJobComponent,HeroProfileComponent,BannerComponent } from "./component";

@NgModule({
  imports:[
    CommonModule,
    routing
  ],
  declarations:[
    DynamicComponent,
    DynamicDirective,
    HeroProfileComponent,
    HeroJobComponent,
    BannerComponent
  ],
  entryComponents:[HeroJobComponent,HeroProfileComponent],
  providers:[
    DynamicService
  ]
})
export class DynamicModule{

}
