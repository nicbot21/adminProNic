import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const pagesRoutes: Routes = [
    {path: '',
    component: PagesComponent,
    children: [
       {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
       {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
       {path: 'graficas1', component: Graficas1Component , data: {titulo: 'Gráficas'}},
       {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
       {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJS'} },
       {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Tema'} },
       {path: '', redirectTo: '/dashboard', pathMatch:'full' }, //ruta cuando no existe ninguna ruta
    ]
   },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);