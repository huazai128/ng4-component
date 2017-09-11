import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "../../theme/themeModule";

import { FullpageComponent } from "./fullpage.component";
import { routing } from "./fullpage.routing";

@NgModule({
  imports:[
    CommonModule,
    ThemeModule,
    routing
  ],
  declarations:[
    FullpageComponent
  ],
  providers:[

  ]
})

export class FullpageModule{

}
