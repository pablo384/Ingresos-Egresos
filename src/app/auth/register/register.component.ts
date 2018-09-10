import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public authS: AuthService) { }

  ngOnInit() {
  }

  onSubmit(data) {
    // console.log(data);
    this.authS.crearUsuario(data.nombre, data.email, data.password);
  }

}
