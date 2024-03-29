import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderHistoryModel } from '../feat-modules/order/components/order-form/order-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private ordersUrl: string = `${environment.server}/api/orders/search`

  private ordersSearchEntries = new BehaviorSubject<OrderHistoryModel[]>([]);
  public orderEntries$: Observable<OrderHistoryModel[]> = this.ordersSearchEntries.asObservable()

  public handlerRsults: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public results$: Observable<boolean> = this.handlerRsults.asObservable()


  constructor(
    private http: HttpClient,
  ) { }




  // GET request - get search products : http://localhost:3000/api/products/search/:query
  public searchOrders(control: UntypedFormControl, userId: string): Observable<OrderHistoryModel[]> {

    return this.search(control).pipe(
      switchMap((query: string) => {

        if (!query) {
          return of([])        }

        return this.http.get<OrderHistoryModel[]>(this.ordersUrl + `/${userId}` + `/${query}`).pipe(
          tap((orders: OrderHistoryModel[]) => {

            if (orders.length === 0) {
              return this.handleError()
            }
            return this.handleOrders(orders)
          })
        )
      })
    )
  }


  // LOGIC SECTION

  // main method for serach
  public search(control: UntypedFormControl): Observable<string> {

    return control.valueChanges.pipe(
      debounceTime(600),
      map((value: string) => value.length >= 3 ? value : null),
      distinctUntilChanged(),
      switchMap((query: string) => {

        if (!query || !query.trim() || this.validFormat(query)) {
          return of(null)
        }
        return of(query)
      }))
  }

  // prevent search with special symbols
  private validFormat(query: string): boolean {
    const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regex.test(query)
  }



  // handle search error
  private handleError(): Observable<[]> {
    this.handlerRsults.next(true)
    this.ordersSearchEntries.next([]);
    return of([]);
  }

  private handleOrders(orders: OrderHistoryModel[]): Observable<OrderHistoryModel[]> {
    this.handlerRsults.next(false)
    this.ordersSearchEntries.next(orders);
    return of(orders)

  }





}
