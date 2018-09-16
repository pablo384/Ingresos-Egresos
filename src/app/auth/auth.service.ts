import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from 'src/app/auth/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { Subscription } from 'rxjs';
import { SetUserAction, UnsetUserAction } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subscripcionUser: Subscription;
  private usuario: User;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private aFDB: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.subscripcionUser = this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        // console.log(fbUser.uid);
        this.aFDB.doc(`${fbUser.uid}/usuario`).valueChanges()
        .subscribe(
          (userOBJ: any) => {
            const newUser = new User(userOBJ);
            this.usuario = newUser;
            this.store.dispatch(new SetUserAction(newUser));
          }
        );
      } else {
        this.usuario = null;
        this.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(respuesta => {
        // console.log(respuesta);
        const user: User = {
          uid: respuesta.user.uid,
          nombre: nombre,
          email: respuesta.user.email
        };
        this.aFDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DesactivarLoadingAction());

          })
          .catch(err => {
            console.log(err);
            this.store.dispatch(new DesactivarLoadingAction());
          });
      })
      .catch(error => {
        console.log(error);
        Swal('Error en el registro', error.message, 'error');
        this.store.dispatch(new DesactivarLoadingAction());
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log(res);
        this.store.dispatch(new DesactivarLoadingAction());
        this.usuario = new User(res.user);
        console.log(this.usuario);
        this.store.dispatch(new SetUserAction(this.usuario));
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err);
        Swal('Error en el login', err.message, 'error');
        this.store.dispatch(new DesactivarLoadingAction());
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.store.dispatch(new UnsetUserAction());
    this.afAuth.auth.signOut();
  }
  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) {
            this.router.navigate(['/login']);
          }
          return fbUser != null;
        })
      );
  }
  unsubscribe() {
    this.subscripcionUser.unsubscribe();
  }
  getUsuario() {
    return {... this.usuario};
  }
}
