import { Routes,RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";

const routes:Routes = [
  {
    path:"pages",
    component:PagesComponent,
    children:[
      {path:"",redirectTo:"upload",pathMatch:"full"},
      {path:"upload",loadChildren:"app/pages/ng2-upload/upload.module#UploadModule"},
      {path:"dynamic",loadChildren:"app/pages/dynamic/dynamic.module#DynamicModule"},
      {path:"unless",loadChildren:"app/pages/unless/unless.module#UnlessModule"},
      {path:'editor',loadChildren:"app/pages/quill-editor/editor.module#EditorModule"},
      {path:"fullpage",loadChildren:"app/pages/fullpage/fullpage.module#FullpageModule"}
    ]
  }
]

export const routing = RouterModule.forChild(routes);
