import { Routes,RouterModule } from "@angular/router";
import { UploadFileComponent } from "./upload.component";

const routes:Routes = [
  {path:"",component:UploadFileComponent}
];

export const routing = RouterModule.forChild(routes);
