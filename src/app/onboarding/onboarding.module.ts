import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { DefaultOnboardingComponent } from './default-onboarding/default-onboarding.component';
import { SecondaryOnboardingComponent } from './secondary-onboarding/secondary-onboarding.component';
import { AuthenticationModule } from '../shared/auth/authentication.module';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from '@angular/platform-browser';
import { PoliciesRefundsComponent } from './policies-refunds/policies-refunds.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';


@NgModule({
  declarations: [
    OnboardingComponent,
    DefaultOnboardingComponent,
    SecondaryOnboardingComponent,
    PoliciesRefundsComponent,
    PrivacyPolicyComponent,
    TerminosCondicionesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnboardingRoutingModule,
    AuthenticationModule,
    SwiperModule,
    FormsModule,
    SharedModule
]
})
export class OnboardingModule { }
