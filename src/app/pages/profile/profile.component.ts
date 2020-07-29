import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;

  imagenTemp: string ;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = _usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario){

    //actualziar objeto del usuario
    this.usuario.nombre = usuario.nombre;

    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }


    this._usuarioService.actualizarUsuario(this.usuario)
                        .subscribe(/* resp => {
                                  console.log('verificar salida: ', resp);

                        }*/);

  }

  seleccionImagen( archivo: File ){


    if(!archivo){
      // si no selecciona ninguna imagen
      this.imagenSubir = null;
        return;
    }
    //console.log(archivo);
    if( archivo.type.indexOf('image') < 0){
      Swal.fire('Solamente Imagenes', 'El archivo seleccionado no es una imagen', 'warning');
      this.imagenSubir=null
      return;
    }

    //si recibimos archivo
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    //console.log(urlImagenTemp);

    //reader.onloadend = () => this.imagenTemp = (reader.result).toString();
    reader.onloadend = () => this.imagenTemp = reader.result.toString();
    //console.log(this.imagenTemp);
  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

}
