import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share-modules/shared.module';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule { }
