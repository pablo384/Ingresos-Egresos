import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subsIn: Subscription = new Subscription();
  constructor(private store: Store<AppState>,
    public ingresoEgresoService: IngresoEgresoService) { }

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
  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
    .then(
      () => {
        Swal('Item ELIMINADO', item.descripcion, 'success');
      }
    );
  }

}
