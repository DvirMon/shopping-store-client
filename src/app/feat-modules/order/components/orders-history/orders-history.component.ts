import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderSearchComponent } from '../order-search/order-search.component';


import { FormService } from 'src/app/services/form.service';
import { OrderService } from '../../order.service';
import { OrderHistoryModel } from '../order-form/order-model';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {

  @ViewChild('search') searchRef: OrderSearchComponent

  public selected: number;
  public isMobile$: Observable<boolean>
  public orders$: Observable<OrderHistoryModel[]>
  public values$: Observable<number[]>
  public orderEntries$: Observable<OrderHistoryModel[]>

  constructor(
    private orderServcie: OrderService,
    private formService: FormService
  ) {
    this.isMobile$ = this.formService.isMobile()
    this.orders$ = this.orderServcie.ordersHistory$
    this.values$ = this.orderServcie.years$
    this.orderEntries$ = this.orderServcie.orderEntries$
  }

  ngOnInit(): void {

    this.orderServcie.getOrdersHistory(90)
    this.orderServcie.getOrdersYeras()
  }

  // SUBSCRIBE SECTION

  public onCloseStart() {
    this.searchRef.inputRef.nativeElement.blur()
  }

  public onSelect() {
    this.orderServcie.getOrdersHistory(this.selected)
  }


}
