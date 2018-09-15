import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subsIn: Subscription = new Subscription();
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subsIn = this.store.select('ingresoEgreso')
    .subscribe(
      ingre => {
        // console.log(ingre.items);
        this.items = ingre.items;
      }
    );
  }
  ngOnDestroy() {
    this.subsIn.unsubscribe();
  }
  borrarItem(uid: string) {
    console.log(uid);
  }

}
