import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  // realizamos injeccion de documento html
  constructor(
    @Inject(DOCUMENT) private _document,
    public _ajustes: SettingsService
  ) {}

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    //aplicar en cada clase selector el working con un check
    this.aplicarCkeck(link);

    /*
    //cambiar atributo de index desde aqui
    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href',url);

    // utilziar servicio ajustes
    //   servicio - propiedad
    this._ajustes.ajustes.tema = tema;
    this._ajustes.ajustes.temaUrl = url;

    //guarar en localstorage implementado en servicio el tema y la urll
    this._ajustes.guardarAjustes();*/

    //AHORA SOLO SE USA LA FUNCION DE SETTINGS.SERVICE.TS
    this._ajustes.aplicarTemaService(tema);
  }

  aplicarCkeck(link: any) {
    let selectores: any = document.getElementsByClassName('selector');
    //for Each que permite recorrer las clases selectores
    for (let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') == tema) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
