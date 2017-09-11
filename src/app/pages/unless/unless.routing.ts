import { Routes,RouterModule } from "@angular/router";
import { UnlessComponent } from "./unless.component";

const routes:Routes = [
    {path:"",component:UnlessComponent}
]

export const routing = RouterModule.forChild(routes);
