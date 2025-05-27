import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/soporte/proximamente', pathMatch: 'full' },
  { path: 'soporte', loadChildren: () => import('./supportive/supportive.module').then(m => m.SupportiveModule) },
  { path: 'evento', loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
