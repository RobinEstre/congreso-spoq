import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { PoliciesRefundsComponent } from './onboarding/policies-refunds/policies-refunds.component';
import { PrivacyPolicyComponent } from './onboarding/privacy-policy/privacy-policy.component';
import { TerminosCondicionesComponent } from './onboarding/terminos-condiciones/terminos-condiciones.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule) },
  // {path: '', component: OnboardingComponent},
  { path: 'politica-cambios', component: PoliciesRefundsComponent },
  { path: 'politica-privacidad', component: PrivacyPolicyComponent },
  { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
  { path: '**', redirectTo: '', loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule) }
  // { path: '', redirectTo: '/evento', pathMatch: 'full' },
  // { path: 'soporte', loadChildren: () => import('./supportive/supportive.module').then(m => m.SupportiveModule) },
  // { path: 'evento', loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
