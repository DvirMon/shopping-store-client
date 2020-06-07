import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { store } from '../redux/store';
import { ProductModel } from '../models/product-model';
import { PaginationDataModel } from '../models/pagination-model';
import { PaginationService } from '../services/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Observable<PaginationDataModel> | Promise<PaginationDataModel> | PaginationDataModel>{

  constructor(
    private productService: ProductsService,
    private paginationService: PaginationService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PaginationDataModel> | Promise<PaginationDataModel> | PaginationDataModel {

    const categoryId: string = route.params.categoryId
    const alias: string = route.params.alias
    const pagination: PaginationDataModel = { ...store.getState().products[alias] }

    if (pagination.products.length === 0) {
      return this.productService.getProductsPagination(1, 8, categoryId, alias)
    } else {
      pagination.products = pagination.products.slice(0, 8)
      return pagination
    }
  }
}
