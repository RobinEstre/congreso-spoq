import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportiveRoutingModule } from './supportive-routing.module';
import { SupportiveComponent } from './supportive.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    SupportiveComponent,
    ComingSoonComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    SupportiveRoutingModule
  ]
})
export class SupportiveModule { }
