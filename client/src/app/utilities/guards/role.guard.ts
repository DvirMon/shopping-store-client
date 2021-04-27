import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { tap } from 'rxjs/operators';
import { store } from '../redux/store';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private tokenServcie: TokenService,
  ) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    // verify token?
    return this.tokenServcie.getAccessToken().pipe(
      tap(auth => {
        const user = store.getState().auth.user
        if (auth && user.isAdmin) {
          return true
        }
        return false
      }))
  }
}
