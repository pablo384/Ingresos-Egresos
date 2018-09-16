import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  cuantosegresos: number;
  cuantosingresos: number;

  subscripcion: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [0, 0];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscripcion = this.store.select('ingresoEgreso')
      .subscribe(
        ingresoEgeso => {
          this.contarIngresoEgreso(ingresoEgeso.items);
        }
      );
  }
  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosegresos = 0;
    this.cuantosingresos = 0;

    items.forEach(
      item => {
        if (item.tipo === 'ingreso') {
          this.cuantosingresos++;
          this.ingresos += item.monto;
        } else {
          this.cuantosegresos++;
          this.egresos += item.monto;
        }
      }
    );
    this.doughnutChartData = [this.ingresos, this.egresos];
  }

}
