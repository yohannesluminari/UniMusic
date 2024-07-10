import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellingPageComponent } from './selling-page.component';

const routes: Routes = [{ path: '', component: SellingPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellingPageRoutingModule { }
