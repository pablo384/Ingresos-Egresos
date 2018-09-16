import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authS: AuthService) { }

  canActivate() {
    return this.authS.isAuth();
  }
  canLoad() {
    return this.authS.isAuth()
    .pipe(
      take(1)
    );
  }
}
