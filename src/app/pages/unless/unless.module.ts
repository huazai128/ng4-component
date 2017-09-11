import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UnlessComponent } from "./unless.component";

import { routing } from "./unless.routing";
import { heroSwitchComponents } from "./component/hero.component"
import { UnlessDirective } from "./unless.directive";

@NgModule({
  imports:[
    CommonModule,
    routing
  ],
  declarations:[
    UnlessComponent,
    heroSwitchComponents,
    UnlessDirective
  ],
  providers:[

  ]
})
export class UnlessModule{

}
