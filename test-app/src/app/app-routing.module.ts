import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CubeComponent} from "./components/cube/cube.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cube',
    pathMatch: 'full'
  },
  {
    path: 'cube',
    component: CubeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
