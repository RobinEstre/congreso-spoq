import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ErrorComponent } from './error/error.component';
import { SupportiveComponent } from './supportive.component';

const routes: Routes = [{
  path: '', component: SupportiveComponent,
  children: [
    { path: 'proximamente', component: ComingSoonComponent },
    { path: 'error', component: ErrorComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportiveRoutingModule { }
