import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardRoutingModule } from 'src/app/pages/dashboard/dashboard-routing.module';
import { ProfileRoutingModule } from 'src/app/pages/profile/profile-routing.module';
import { OtherRoutingModule } from 'src/app/pages/other/other-routing.module';
import { ComponentsRoutingModule } from 'src/app/pages/components/components-routing.module';
import { OnboardingRoutingModule } from 'src/app/onboarding/onboarding-routing.module';
import { SharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ProfileRoutingModule,
    OtherRoutingModule,
    ComponentsRoutingModule,
    OnboardingRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
