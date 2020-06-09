import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})

/**
 * 1. Se utiliza router para colocar en el breadcrum el nombre de cada pagina
 * 2. se utiliza title para cambiar el titulo de la pestaña de la pagina en chrome
 * 3. Se utilizan metas para 
 */
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor( private router: Router,
               public title: Title,
               public meta: Meta) {
            this.getdataRoute()
                      .subscribe(data => {
                        //console.log(' close',data);
                       //console.log(' data :',this.label);
                       this.label = data.titulo;
                       title.setTitle( this.label);

                       let metaTag: MetaDefinition = {
                         name: 'description',
                         content: this.label

                       }

                       meta.updateTag(metaTag);
                      });
   }




   getdataRoute(){
                    //se hace el retorno del observable
                    return this.router.events              
                                                    // preguntar si el evento es una instanceof de activationEnd
                    .pipe(filter( evento => evento instanceof ActivationEnd))
                      //agrego otro filter para verificar que firstChild sea nulo ya que venian dos ActivationEnd con las rutas, la visualziada y las internas
                    .pipe(filter( (evento : ActivationEnd) => evento.snapshot.firstChild === null))
                      // Usar map para extraer informacion que se necesita de las rutas -> data
                    .pipe(map( (evento : ActivationEnd) => evento.snapshot.data))

   }

  ngOnInit(): void {
  }

}
