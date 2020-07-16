import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';

import Swal from 'sweetalert2';

//operator map - observable
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: String;

  constructor(public http: HttpClient, public router: Router) {
    console.log('Service ok');
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      var user = JSON.stringify(this.usuario); // no pasa hay error - usuario undefined
      this.token = localStorage.getItem('token');
      //this.usuario = JSON.parse(localStorage.getItem('usuario')); corregir!!!!!!!!
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';

    //eliminar de localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    //al deslogear mandar a login
    this.router.navigate(['/login']);


  }


  /**
   * 
   * @param token 
   */

  loginGoogle(token: String) {
    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token }).pipe(
      map((respo: any) => {
        this.guardarStorage(respo.id, respo.token, respo.suario);
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICES + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.suario);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICES + '/usuario';

    //depende de la peticion; en este caso es post

    return this.http.post(url, usuario).pipe(
      map((response: any) => {
        Swal.fire('Usuario creado correctamente', usuario.email, 'success');
        return response.usuario;
      })
    ); // importar map de rxjs dentro de un pipe*/
  }
}
