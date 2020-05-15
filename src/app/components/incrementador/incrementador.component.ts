import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  //decorador para refereir al html
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'leyenda';
  @Input() porcentaje: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<
    number
  > = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onChanges(newValue: number) {
    //vanila javascript
    //let elemHTML:any = document.getElementsByName('porcentaje')[0];

    //console.log(elemHTML.value);

    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }

  cambiarValor(valor: number) {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
    } else if (this.porcentaje <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = this.porcentaje + valor;
    }

    this.cambioValor.emit(this.porcentaje);

    this.txtProgress.nativeElement.focus();
  }
}
