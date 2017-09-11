import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MdlModule } from "@angular-mdl/core";
import { ThemeModule } from "../../theme/themeModule";
import { routing } from "./upload.routing";
import { UploadFileComponent } from "./upload.component";

@NgModule({

  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MdlModule,
    ThemeModule,
    routing
  ],
  declarations:[
    UploadFileComponent
  ],
  providers:[

  ]
})

export class UploadModule{

}
