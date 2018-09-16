import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor( public ingresoEgresoService: IngresoEgresoService,
    public authS: AuthService) { }

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgresoListener();
    this.authS.initAuthListener();
  }
  ngOnDestroy() {
    this.authS.unsubscribe();
  }

}
