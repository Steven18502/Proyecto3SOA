import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargardatosComponent } from './cargardatos/cargardatos.component';

const routes: Routes = [
  { path: '', component: CargardatosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
