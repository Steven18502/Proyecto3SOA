import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerdatosComponent } from './verdatos/verdatos.component';

const routes: Routes = [
  { path: "", component: VerdatosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
