import { Routes,RouterModule } from "@angular/router";
import { DynamicComponent } from "./dynamic.component";

const routes:Routes = [
  {path:"",component:DynamicComponent}
]

export const routing = RouterModule.forChild(routes);
