import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { UntypedFormControl } from '@angular/forms';

import { ReceiptService } from 'src/app/services/receipt.service';


import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment'
import { FormService } from 'src/app/services/form.service';

import { AuthService } from 'src/app/feat-modules/auth/auth.service';
import { CartModel } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit {

  @Input() public drawer: MatSidenav;
  @Input() public orderMode: boolean = false;

  public searchControl = new UntypedFormControl();

  public isMobile$: Observable<boolean>
  public cart$: Observable<CartModel>

  public totalPrice: number;

  private isLogin: boolean

  constructor(
    private router: Router,

    private formService: FormService,
    private cartService: CartService,
    private authService: AuthService,
    private receiptService: ReceiptService,

    private cart: CartModel
  ) {
    this.isLogin = this.authService.auth.isLogin
    this.isMobile$ = this.formService.isMobile()
    this.cart$ = this.cartService.cart$
  }

  ngOnInit(): void {
    this.subscribeToCartState()
  }

  // SUBSCRIBE SECTION

  private subscribeToCartState() {
    this.cart$.subscribe(
      (state: CartModel) => {
        this.cart = state
        this.totalPrice = this.cart.getTotalPrice()
      }
    )
  }


  // end of subscribe section

  // HTTP SECTION

  public deleteAllCartItems(): void {

    if (this.cart.getItems().length === 0) {
      return
    }

    const answer = confirm("Delete Cart?")

    if (!answer) {
      return
    }

    this.isLogin
    ? this.cartService.deleteCartAndCartItems(this.cart.get_id())
    : this.cartService.deleteTempCart()
  }


  // LOGIC SECTION

  // navigate to order
  public goToOrder(): Promise<boolean> {

    if (this.cart.getItems().length === 0) {
      alert("your cart is empty")
      return
    }

    return this.router.navigateByUrl(`/home/order/${this.cart.get_id()}`)
  }

  // navigate back to store
  public backToSore(): void {
    this.receiptService.resetReceiptState()
    this.router.navigateByUrl(environment.productLandingPage)
  }

  // end of logic section
}
