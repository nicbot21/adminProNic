import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

import Swal from 'sweetalert2';

declare function init_plugins();
declare const gapi: any; // confia en mi existe una libreria llamada gapi

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    //inicializar y llamar plugins para el sidebar
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || ''; // "||" para hacer que al discheck no guarde y quede vacio casi igual al else

    if( this.email.length > 1){ // para que el check persista y este marcado
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', ( ) => {
      this.auth2 = gapi.auth2.init({
        client_id: '530367333534-5pc4mgtu8trod5ud8ok6guu2tsie53jj.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn( document.getElementById('btnGoogle'));

    });
  }

  attachSignIn( element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      let profile = googleUser.getBasicProfile(); // obtener el perfil antes de realizar el logeo
      //obtener token
      let token = googleUser.getAuthResponse().id_token;
      //console.log(profile)
      //console.log(token)

      this._usuarioService.loginGoogle(token )
                          .subscribe( logeoCorrecto => {
                            window.location.href = '#/dashboard'; //redireccion usando vanilla js
                            //this.router.navigate(['/dashboard']);
                            console.log('logeoCorrecto google: ',logeoCorrecto);
                          });
    });
  }

  ingresar( forma: NgForm ){

    if( forma.invalid ){
      return;
    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password);
    this._usuarioService.login( usuario, forma.value.recuerdame)
                        .subscribe( correcto => {

                          this.router.navigate(['/dashboard']);
                          console.log( 'resps:', correcto);
                          console.log('regresar usuario al ingresar - ingresar2:', usuario);
                        });

   console.log("ingresando :: sale forma valid: ", forma.valid);
   console.log("ingresando :: sale forma value: ", forma.value);
  //this.router.navigate(['/dashboard']);
  }



}
