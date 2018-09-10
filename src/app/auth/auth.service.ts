import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import { User } from 'src/app/auth/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private aFDB: AngularFirestore
    ) { }

    initAuthListener() {
      this.afAuth.authState.subscribe((fbUser: firebase.User) => {
        console.log(fbUser);
      });
    }

  crearUsuario(nombre: string, email: string, password: string) {
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
      .then( () => {
        this.router.navigate(['/']);
      })
      .catch( err => console.log(err));
    })
    .catch(error => {
        console.log(error);
      Swal('Error en el registro', error.message, 'error');

      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      // console.log(res);
      this.router.navigate(['/']);
    })
    .catch(err => {
      console.log(err);
      Swal('Error en el login', err.message, 'error');
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
  isAuth() {
    return this.afAuth.authState
    .pipe(
      map( fbUser => {
      if (fbUser == null) {
        this.router.navigate(['/login']);
      }
        return fbUser != null;
      })
    );
  }
}
