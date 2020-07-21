import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img:  string, tipoTabla: string = 'usuarios'): any {

    let url = URL_SERVICES + '/img';

    if(!img){
      return url + '/usuarios/xxxx';
    }

    //verificar si en la iamgen viene un https - que seria imagen de google
    if( img.indexOf('https') >= 0){
      return img;
    }

    //si no es https pero si son de las coleccioens usuario,medico y hosptiles
    switch (tipoTabla){
      case 'usuario':
        url += '/usuarios' + img;
        break;

      case 'medico':
        url += '/medicos' + img;
        break;

      case 'hospital':
         url += '/hospitales' + img;
        break;

      default:
        console.log('tipo de imagen no existe. Existentes son: usuarios, medicos, hospitales ')
        url += '/usuarios/xxxx';
      }
    return 'mi PIPE funciona';
  }

}
