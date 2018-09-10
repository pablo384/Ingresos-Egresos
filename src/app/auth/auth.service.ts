import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth
    .auth
    .createUserWithEmailAndPassword(email, password)
    .then(respuesta => {
      console.log(respuesta);
      this.router.navigate(['/']);
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
      console.log(res);
      this.router.navigate(['/']);
    })
    .catch(err => {
      console.log(err);
      Swal('Error en el login', err.message, 'error');
    });
  }
}
