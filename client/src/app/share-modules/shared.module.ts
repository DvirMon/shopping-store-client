import { NgModule, ErrorHandler } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';

// import for global providers
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../interceptors/auth-interceptor.service';
import { DialogInterceptorService } from '../interceptors/dialog-interceptor.service';
import { ErrorsService } from '../services/errors.service';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// import models for providers 
import { OrderModel } from '../models/order-model';
import { ProductModel } from '../models/product-model';

// shared components 
import { MyInputComponent } from './components/my-input/my-input.component';
import { UploadInputComponent } from './components/upload-input/upload-input.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SearchComponent } from './components/search/search.component';
import { ProductThumbnailComponent } from './components/product-thumbnail/product-thumbnail.component';
import { CartListItemComponent } from './components/cart-list-item/cart-list-item.component';
import { SearchListItemComponent } from './components/search-list-item/search-list-item.component';
import { HighLightPipe } from '../pipes/high-light.pipe';

 
@NgModule({
  declarations: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    SearchComponent,
    SearchListItemComponent,
    ProductThumbnailComponent,
    CartListItemComponent,
    HighLightPipe,

  ],
  imports: [
    CoreModule,
  ],
  exports: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    SearchComponent,
    SearchListItemComponent,
    ProductThumbnailComponent,
    CartListItemComponent,
    HighLightPipe,
  ], providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DialogInterceptorService,
      multi: true
    },
    {
      provide: OrderModel,
      useValue: {}
    },
    {
      provide: ProductModel,
      useValue: new ProductModel()
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {} },
    { provide: MatDialogRef, useValue: DialogComponent },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
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
