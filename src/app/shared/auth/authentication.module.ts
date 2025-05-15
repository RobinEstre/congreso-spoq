import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
import { AuthrightComponent } from './authright/authright.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthrightComponent
  ],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthrightComponent
  ]
})
export class AuthenticationModule { }
