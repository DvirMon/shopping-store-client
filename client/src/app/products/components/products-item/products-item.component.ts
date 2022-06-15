import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/products/products.service';

import { ProductModel } from 'src/app/products/product-model';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent {

  @Input() public product: ProductModel;

  public isMobile: Observable<boolean> = this.productService.isMobile()
  public isAdmin: boolean = this.authService.auth.user.isAdmin;

  constructor(
    private authService : AuthService,
    private dialogService: DialogService,
    private productService: ProductsService,
  ) { }

  public handleProductDialog(): void {

    this.isAdmin
      ? this.productService.handleUpdate.next(this.product)
      : this.dialogService.handleProductDialog(this.product)
  }


}

