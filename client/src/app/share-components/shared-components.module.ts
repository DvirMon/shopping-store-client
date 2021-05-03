import { NgModule, ErrorHandler, Input } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';

// GLOBAL PROVIDES
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

// SERVICES
import { AuthInterceptorService } from '../utilities/interceptors/auth-interceptor.service';
import { SpinnerInterceptorService } from '../utilities/interceptors/spinner-interceptor.service';
import { ErrorsService } from '../utilities/interceptors/errors.service';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

// SHRED COMPONENTS
import { AboutComponent } from './components/about/about.component';

import { InputUploadComponent } from './components/input-upload/upload-input.component';

import { DialogComponent } from './components/dialog/dialog.component';

import { SearchComponent } from './components/search/search.component';
import { SearchListItemComponent } from './components/search-list-item/search-list-item.component';

import { ProductThumbnailComponent } from './components/product-thumbnail/product-thumbnail.component';

import { AddressComponent } from './components/address/address.component';


// DIRECTIVE
import { BarBackgroundColorDirective } from '../utilities/directives/bar-background-color.directive';
import { BackgroundImageDirective } from '../utilities/directives/background-image.directive';
import { SidenavAdminDirective } from '../utilities/directives/sidnav-admin.directive';

// PIPES
import { HighLightPipe } from '../utilities/pipes/high-light.pipe';

import { environment } from 'src/environments/environment'
import { InputComponent } from './components/input/input.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { ProductsCategoriesComponent } from './components/products-categories/products-categories.component';

@NgModule({
  declarations: [
    AboutComponent,

    InputComponent,
    InputPasswordComponent,
    InputUploadComponent,

    DialogComponent,

    SearchComponent,
    SearchListItemComponent,

    ProductThumbnailComponent,
    ProductsCategoriesComponent,

    AddressComponent,
    HighLightPipe,

    BarBackgroundColorDirective,
    BackgroundImageDirective,
    SidenavAdminDirective,

  ],
  imports: [
    CoreModule,
    RecaptchaV3Module

  ],
  exports: [
    AboutComponent,

    ProductThumbnailComponent,
    ProductsCategoriesComponent,

    InputComponent,
    InputPasswordComponent,
    InputUploadComponent,
    AddressComponent,

    DialogComponent,

    SearchComponent,
    SearchListItemComponent,


    HighLightPipe,

    BarBackgroundColorDirective,
    BackgroundImageDirective,
    SidenavAdminDirective,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {} },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true }
    },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.reCaptchaSiteKey },

    {
      provide: ErrorHandler,
      useClass: ErrorsService
    },
  ],
  entryComponents: [
    DialogComponent,
  ]

})
export class SharedModule { }
