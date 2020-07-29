import { Component, OnInit, Input, Output, AfterContentInit, AfterContentChecked, DoCheck, OnChanges, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit{

  porcentaje1:number = 20;
  porcentaje2:number = 30;

  constructor(
  ) { }

  ngOnInit(): void {
    //console.log("A")
  }






}
