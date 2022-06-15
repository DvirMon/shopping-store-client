import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav';

import { CurrentItemModel } from 'src/app/cart/components/cart-list-item/cart-item-model';

import { ProductsService } from 'src/app/products/products.service';
import { AuthService } from 'src/app/auth/auth.service';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products-nav',
  templateUrl: './products-nav.component.html',
  styleUrls: ['./products-nav.component.scss']
})
export class ProductsNavComponent {

  @Input() drawerProduct: MatSidenav
  @Input() drawerCart: MatSidenav
  @Input() drawerSearch: MatSidenav
  @Input() isAdmin: boolean

  @Output() searchMode = new EventEmitter<boolean>()

  public isMobile$: Observable<boolean> = this.productsService.isMobile()
  public currentItems: CurrentItemModel[]

  constructor(
    private productsService: ProductsService,
  ) { }



  // LOGIC SECTION

  public onDrawerProducts(search: boolean) {
    this.searchMode.emit(search)
    this.drawerProduct.toggle()
  }


}
