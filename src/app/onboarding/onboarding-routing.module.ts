import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultOnboardingComponent } from './default-onboarding/default-onboarding.component';
import { OnboardingComponent } from './onboarding.component';
import { SecondaryOnboardingComponent } from './secondary-onboarding/secondary-onboarding.component';

const routes: Routes = [{ 
  path: '',
  component: OnboardingComponent,
  children: [{
    path: 'default',
    component: DefaultOnboardingComponent
  }, {
    path: 'secondary',
    component: SecondaryOnboardingComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
