import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, retry, retryWhen, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  //--------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------
  //---------------- PRACICA DE OBSERVABLES OBSERVERS ------------------------------
  //--------------------------------------------------------------------------------
  subscription: Subscription;
  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      (numero) => console.log('Subs', numero),
      (error) => console.error('Error en el obs', error),
      () => console.log('El observador termino')
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('se cerrara la pagina');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    // reactive extensions
    //let obs = new Observable( observer => {
    return new Observable((observer) => {
      let contador = 0;

      //cuerpo de la funcion
      //emitir un valor cada segundo
      let intervalo = setInterval(() => {
        contador += 1;

        let salida = {
          valor: contador,
        };
        // un observable trabaja con una linea de datos (en tiempo infinito)
        observer.next(salida);

        /*if( contador === 3){
                            clearInterval( intervalo);
                            observer.complete();
                          }*/

        /*if(contador === 4){
                           // clearInterval( intervalo);
                            observer.error('Auxilio!');
                          }*/
      }, 500);
    })
      .pipe(retry(2))
      .pipe(
        map((resp: any) => {
          // el operador map jamas se ejecutara solo hasta que el valor se subscriba
          return resp.valor;
        })
      )
      .pipe(
        filter((valor, index) => {
          if (valor % 2 === 1) {
            //impar
            return true;
          } else {
            //par
            return false;
          }
          //console.log('Filter', valor, index);
          return true;
        })
      );

    //return obs;
  }
}
