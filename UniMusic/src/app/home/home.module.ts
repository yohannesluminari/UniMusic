import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AuthService } from '../auth/auth.service';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { FooterComponent } from '../components/footer/footer.component';
import { YohannesLuminariComponent } from '../components/yohannes-luminari/yohannes-luminari.component';


@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    FooterComponent,
    YohannesLuminariComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
  constructor(private autSvc:AuthService){}

}


