import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'asssets/css/colors/default.css',
    tema: 'default',
  };

  //injectamos el documento html
  constructor(@Inject(DOCUMENT) private _document) {
    //se hace el llamado de cargarAjustes para utilizarla en app.component.ts
    this.cargarAjustesService();
  }

  guardarAjustesService() {
    //grabar ajustes en localstorage -- para que al reiniciar este como se escogio
    //localstorage solo graba en strings entonces
    //se oloca JSON.stringify para que tome el objeto y lo convierte en string para grabarlo en localstorage
    //console.log('Guardado en localstorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustesService() {
    if (localStorage.getItem('ajustes')) {
      //pasar el objeton con JSON.parse para convertirlo a js
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      //console.log('cargando del localstorage');

      //llamar el tema al cargar pagina lo que esta guardado en localstorage
      this.aplicarTemaService(this.ajustes.tema);
    } else {
      //console.log('usando valores por defecto');
    }
  }

  aplicarTemaService(tema: string) {
    //se aplica lo que estaba por defecto en account-settings y se coloca aca
    //cambiar atributo de index desde aqui
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    // utilziar servicio ajustes
    //   servicio - propiedad
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    //guarar en localstorage implementado en servicio el tema y la urll
    this.guardarAjustesService();
  }
}
//permite ajustar
interface Ajustes {
  temaUrl: string;
  tema: string;
}
