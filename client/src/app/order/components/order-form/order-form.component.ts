import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { MatSelect } from '@angular/material/select';
import { FormGroup, FormControl } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';
import { UserModel } from 'src/app/utilities/models/user-model';
import { OrderService } from 'src/app/services/order.service';

import { CartModel } from 'src/app/utilities/models/cart-model';
import { OrderModel } from 'src/app/utilities/models/order-model';

import { store } from 'src/app/utilities/redux/store';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, AfterViewInit {

  public orderForm: FormGroup;
  public cartTotalPrice: number;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formService: FormService,
    private orderService: OrderService,
    private order: OrderModel,
    public user: UserModel,
    public cart: CartModel,

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.subscribeToStore();
    this.orderDefaultValues();
  }

  ngAfterViewInit(): void {
    this.subscribeToForm();
  }


  // subscribe section

  private subscribeToStore(): void {
    store.subscribe(
      () => {
        this.user = store.getState().auth.user;
        this.cart = store.getState().cart.cart;
        this.cartTotalPrice = store.getState().cart.cartTotalPrice;
      }
    )
    this.user = store.getState().auth.user;
    this.cart = store.getState().cart.cart;
    this.cartTotalPrice = store.getState().cart.cartTotalPrice;
  }

  private subscribeToForm(): void {
    this.orderForm.valueChanges.subscribe(
      (controls) => {
        if (!this.orderForm.errors) {
          this.order.shippingDate = controls.shippingDate
          this.order.creditCard = controls.creditCard.trim()
          this.order.city = controls.address.city
          this.order.street = controls.address.street

        }
      }
    )
  }


  // end of subscribe section

  //------------------------------------------------------//

  // form section

  private createForm(): FormGroup {
    return this.orderForm = this.formService.orderForm()
  }

  get address(): FormGroup {
    return this.orderForm.get('address') as FormGroup
  }

  get shippingDate(): FormControl {
    return this.orderForm.get('shippingDate') as FormControl
  }

  get creditCard(): FormControl {
    return this.orderForm.get('creditCard') as FormControl
  }

  // end of form section

  //------------------------------------------------------//


  //  request section

  public onPayment(): void {
    this.orderService.handleNewOrder(this.order)

  }
  // end of request section

  //------------------------------------------------------//


  // order logic section

  private orderDefaultValues(): void {
    this.order.cartId = this.cart._id
    this.order.userId = this.user._id
    this.order.totalPrice = this.cartTotalPrice
  }

  // end of logic section


}
