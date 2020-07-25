import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// import * as $ from 'jquery';

export class LoginComponent implements OnInit {


  constructor(private auth: AuthenticationService, private router: Router) { }

  inRegister: boolean = false;

  user: string = "";
  password: string = "";

  error: string = "";

  user_register: string = "";
  password_register: string = "";
  email_register: string = "";
  name_register: string = "";
  sobrenome_register: string = "";

  error_register: string = "";

  public loading = false;
  ngOnInit() {

  }

  OpenRegister() {
    this.inRegister = true;
  }

  CloseRegister(event: MouseEvent) {
    event.stopPropagation();
    this.inRegister = false;
  }

  OnClickLogin() {
    if (this.user === "" || this.password === "") {
      this.error = "Preencha todos os campos!";
      return;
    }

    this.loading = true;
    var request = this.auth.login(this.user, this.password);
    request.subscribe(result => {
      this.loading = false;
      if (result.code == 1) {
        this.error = "";
        this.router.navigate(['pages/dashboard']);
      } else {
        this.error = result.data;
      }
    });
  }

  OnClickRegister() {

    if (this.sobrenome_register === "" || this.name_register === "" || this.email_register === "" || this.user_register === "" || this.password_register === "") {
      this.error_register = "Preencha todos os campos!";
      return;
    }

    this.user_register = this.user_register.replace(/\s/g, "").toLocaleLowerCase();
    this.email_register = this.email_register.replace(/\s/g, "").toLocaleLowerCase();

    this.loading = true;
    var request = this.auth.register(this.name_register, this.sobrenome_register, this.email_register, this.user_register, this.password_register);
    request.subscribe(result => {
      if (result.code == 1) {
        this.error_register = "";

        var request = this.auth.login(this.user_register, this.password_register);
        request.subscribe(result => {
          if (result.code == 1) {
          this.loading = false;
          this.error = "";
            this.router.navigate(['pages/dashboard']);
          } else {
            this.error = result.data;
            this.loading = false;
          }
        });

      } else {
        this.loading = false;
        this.error_register = result.data;
      }
    });
  }

  onChangeUser(ev) {
    this.user_register = this.user_register.replace(/\s/g, "").toLocaleLowerCase();
  }
  onChangeEmail(ev) {
    this.email_register = this.email_register.replace(/\s/g, "").toLocaleLowerCase();
  }

}
