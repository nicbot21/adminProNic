import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//rutas
import { APP_ROUTES } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//servicios
import { ServiceModule } from './services/service.module';

//pagesModule
import { PagesModule } from './pages/pages.module';

//temporal
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    ServiceModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
