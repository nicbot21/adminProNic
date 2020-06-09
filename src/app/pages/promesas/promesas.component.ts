import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {

    


    this.contarTres().then(
      //mensaje -> recoge lo que esta en resolve
      mensaje => console.log('termino!', mensaje)
    ).catch(
      error=> console.error('Error en la promesa',error)
    );

   }

  ngOnInit(): void {
  }

  //FUNCIONES

  contarTres() : Promise<boolean>{
    
    return new Promise((resolve, reject) => {
    //let promesa = new Promise((resolve, reject) => {
      
      let contador = 0;

      //set interval -> intervalo funcion de javascript que hace ciclo de tiempo 
      //y cada determinados segundos dispara esas funciones
      let itervaluo = setInterval( () => {

        contador +=1;
        console.log(contador)
        if( contador === 3){
          resolve(true);
          //reject('simplemente error'); 
          clearInterval(itervaluo);
        }
      }, 1000); //disparar el interval cada segundo
    });

    //return promesa;
  }

}
