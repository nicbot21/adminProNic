import { URL_SERVICES } from './../config/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  //tipo -> usuario, medico, hospital
  //id   -> id de la imagen o del archivo
  subirArchivo( archivo: File, tipo: string, id: string){

    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      //configuracion form data -> datos a recibir
      formData.append( 'imagen', archivo, archivo.name);
      //configuracion peticion ajax
      xhr.onreadystatechange = function() {

        // se recibe info cada vez que el estado cambie
        //se verifica el estado de  xhr - en 4 cuando termine el proceso
        if(xhr.readyState === 4){
            if( xhr.status === 200){
              resolve( JSON.parse(xhr.response) );
              console.log('Imagen subida');
            }else{
              reject(xhr.response);
              console.log('Fallo la subida del archivo');

            }
        }
      }

      let url = URL_SERVICES + '/upload/' + tipo + '/' + id;
      console.log(url);

      xhr.open('PUT', url, true);
      xhr.send( formData);
    });



  }
}
