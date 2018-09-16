import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  initIngresoEgresoSubscripcion: Subscription = new Subscription();
  initIngresoEgresoItemsSubscripcion: Subscription = new Subscription();
  constructor(
    private aFDB: AngularFirestore,
    public authS: AuthService,
    private store: Store<AppState>
  ) { }

  initIngresoEgresoListener() {
    this.initIngresoEgresoSubscripcion = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe(
      auth => this.ingresoEgresoItems(auth.user.uid)
    );
  }
  private ingresoEgresoItems(uid: string ) {
    this.initIngresoEgresoItemsSubscripcion = this.aFDB.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map(
        docData => {
          return docData.map( doc => {
            return {
              uid: doc.payload.doc.id,
              ... doc.payload.doc.data()
            };
          });
        }
      )
    )
    .subscribe((coleccion: any[]) => {
      // console.log(coleccion);
      this.store.dispatch(new SetItemsAction(coleccion));
    });
  }
  cancelarSubscripcions() {
    this.initIngresoEgresoItemsSubscripcion.unsubscribe();
    this.initIngresoEgresoSubscripcion.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso(inresoEgreso: IngresoEgreso) {
    const user = this.authS.getUsuario();

    return this.aFDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...inresoEgreso });
  }
  borrarIngresoEgreso(uid: string) {
    const user = this.authS.getUsuario();
    return this.aFDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }
}
