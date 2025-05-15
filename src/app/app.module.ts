import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { JustLightboxModule } from 'just-lightbox';
import { LightboxModule } from 'ngx-lightbox';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TagifyModule } from 'ngx-tagify';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { PersonalizationService } from './shared/services/personalization.service';
import { AuthenticationService } from './shared/services/authentication.service';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    Daterangepicker,
    NgCircleProgressModule.forRoot(),
    JustLightboxModule.forRoot(),
    LightboxModule,
    CKEditorModule,
    TagifyModule.forRoot(),
    NgxDropzoneModule,
    NgWizardModule.forRoot(ngWizardConfig),
  ],
  providers: [PersonalizationService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
