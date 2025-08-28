import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultOnboardingComponent } from './default-onboarding/default-onboarding.component';
import { OnboardingComponent } from './onboarding.component';
import { SecondaryOnboardingComponent } from './secondary-onboarding/secondary-onboarding.component';
import { PoliciesRefundsComponent } from './policies-refunds/policies-refunds.component';

const routes: Routes = [
  { path: '', component: DefaultOnboardingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
