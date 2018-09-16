import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre = '';
  subs: Subscription = new Subscription();

  constructor(public authS: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subs = this.store.select('auth')
    .pipe(filter(auth => auth.user != null))
    .subscribe(
      auth => {
        // if (auth.user != null) {
          this.nombre = auth.user.nombre;
        // }
      }
    );
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logOut() {
    this.authS.logout();
  }

}
