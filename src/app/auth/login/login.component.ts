import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public authS: AuthService) { }

  ngOnInit() {
  }
  onSubmit(data) {
    // console.log(data);
    this.authS.login(data.email, data.password);
  }

}
