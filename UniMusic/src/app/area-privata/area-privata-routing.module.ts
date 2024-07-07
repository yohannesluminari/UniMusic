import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaPrivataComponent } from './area-privata.component';

const routes: Routes = [
  { path: '', component: AreaPrivataComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaPrivataRoutingModule { }
