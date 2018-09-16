import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ingresoEgresoApp';

  constructor() { }
  ngOnInit(): void {
    // this.authS.initAuthListener();
  }
  ngOnDestroy() {
    // this.authS.unsubscribe();
  }
}
