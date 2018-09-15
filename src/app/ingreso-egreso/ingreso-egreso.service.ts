import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private aFDB: AngularFirestore,
    public authS: AuthService
  ) { }

  crearIngresoEgreso(inresoEgreso: IngresoEgreso) {
    const user = this.authS.getUsuario();

    return this.aFDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...inresoEgreso });
      // .then(
      //   res => {
      //     console.log(res);
      //   }
      // )
      // .catch(err => {
      //   console.log(err);

      // });
  }
}
