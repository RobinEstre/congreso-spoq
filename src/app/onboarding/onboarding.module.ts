import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { DefaultOnboardingComponent } from './default-onboarding/default-onboarding.component';
import { SecondaryOnboardingComponent } from './secondary-onboarding/secondary-onboarding.component';
import { AuthenticationModule } from '../shared/auth/authentication.module';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OnboardingComponent,
    DefaultOnboardingComponent,
    SecondaryOnboardingComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    AuthenticationModule,
    SwiperModule,
    FormsModule
  ]
})
export class OnboardingModule { }
