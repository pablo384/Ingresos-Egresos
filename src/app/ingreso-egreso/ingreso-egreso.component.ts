import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';
  subscription: Subscription;
  cargando: boolean;

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.crearForm();
    this.subscription = this.store.select('ui').subscribe(
      ui => {
        this.cargando = ui.isLoading;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  crearForm() {
    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl('0', [Validators.required, Validators.min(0)])
    });
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.form.value, tipo: this.tipo });
    // console.log(ingresoEgreso);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        Swal('Creado', ingresoEgreso.descripcion, 'success');
        this.form.reset({
          monto: 0
        });
        this.store.dispatch(new DesactivarLoadingAction());
      });
  }

}
