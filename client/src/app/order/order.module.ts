import { NgModule } from '@angular/core';
import { SharedModule } from '../share-components/shared-components.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../share-modules/core.module';
import { OrderComponent } from './components/order/order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { CartModule } from '../cart/cart.module';
import { DateInputComponent } from './components/date-input/date-input.component';
import { AddressComponent } from './components/address/address.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';



@NgModule({
  declarations: [
    OrderComponent,
    OrderFormComponent,
    DateInputComponent,
    AddressComponent,
    CreditCardComponent
  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    OrderRoutingModule,
    CartModule,
  ]
})
export class OrderModule { }
