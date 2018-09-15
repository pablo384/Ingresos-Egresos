import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  form: FormGroup;
  tipo = 'ingreso';

  constructor(
    public ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.crearForm();
  }
  crearForm() {
    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl('0', [Validators.required, Validators.min(0)])
    });
  }

  crearIngresoEgreso() {
    const ingresoEgreso = new IngresoEgreso({ ...this.form.value, tipo: this.tipo });
    // console.log(ingresoEgreso);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        Swal('Creado', ingresoEgreso.descripcion, 'success');
        this.form.reset({
          monto: 0
        });

      });
  }

}
