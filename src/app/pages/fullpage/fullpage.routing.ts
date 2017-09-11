import { Routes,RouterModule } from "@angular/router";
import { FullpageComponent } from "./fullpage.component";

const routes:Routes = [
  { path:"",component: FullpageComponent}
]

export const routing = RouterModule.forChild(routes);
