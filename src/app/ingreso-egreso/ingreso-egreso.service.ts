import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  subscripcion: Subscription;
  constructor(
    private aFDB: AngularFirestore,
    public authS: AuthService,
    private store: Store<AppState>
  ) { }

  initIngresoEgresoListener() {
    this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe(
      auth => this.ingresoEgresoItems(auth.user.uid)
    );
  }
  private ingresoEgresoItems(uid: string ) {
    this.aFDB.collection(`${uid}/ingresos-egresos/items`)
    .valueChanges()
    .subscribe(docData => {console.log(docData);
    });
  }

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
