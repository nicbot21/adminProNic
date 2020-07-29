import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  SharedService,
  SettingsService,
  SidebarService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService
} from './service.index';


@NgModule({
  declarations: [],
  providers:[
    SharedService,
    SettingsService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
