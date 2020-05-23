import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { CartItemModel } from 'src/app/utilities/models/cart-item-model';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { CartService } from 'src/app/utilities/services/cart.service';
import { DialogService } from 'src/app/utilities/services/dialog.service';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.scss']
})
export class CartListItemComponent implements OnInit {

  @Input() public cartItem: CartItemModel = new CartItemModel()
  @Input() public orderMode: boolean = false
  @Input() public searchTerm: string

  public product: ProductModel = new ProductModel()
  public rowSpan: number;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {

    // style for cart item
    this.orderMode ? this.rowSpan = 2 : this.rowSpan = 1

    this.productService.getProductNameAndImage(this.cartItem.productId).subscribe(
      (response) => this.product = response
    )
  }

  public updateItem() {
    this.dialogService.handleProductDialog(this.product)
  }

  public deleteCartItem() {
    const answer = confirm("Delete Item ?")

    if (!answer) {
      return
    }

    this.cartService.deleteCartItem(this.cartItem._id)
  }
}
