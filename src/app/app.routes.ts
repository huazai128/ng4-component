import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home';

import { DataResolver } from './app.resolver';

export const routing: Routes = [
  { path:"",redirectTo:"pages",pathMatch:"full" },
  { path:"**",redirectTo:"pages",pathMatch:"full" }
];


