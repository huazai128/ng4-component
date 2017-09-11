import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { EditorComponent } from "./editor.component";
import { routing } from "./editor.routing";
import { ThemeModule } from "../../theme/themeModule";

@NgModule({
  imports:[
    CommonModule,
    ThemeModule,
    FormsModule,
    routing
  ],
  declarations:[
    EditorComponent
  ],
  providers:[

  ]
})

export class EditorModule{

}
