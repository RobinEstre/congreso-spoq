import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule)},
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
