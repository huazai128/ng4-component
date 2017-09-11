import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "../theme/themeModule";

import { routing } from "./pages.routing"

import { PagesComponent } from "./pages.component";

@NgModule({
  imports:[
    CommonModule,
    ThemeModule,
    routing
  ],
  declarations:[
    PagesComponent
  ],
  providers:[

  ]
})
export class PagesModule{

}
