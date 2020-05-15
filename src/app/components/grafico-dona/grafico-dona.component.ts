import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {


  @Input('chartData') doughnutChartData: number[] = [];
  @Input('chartLabel') doughnutChartLabels: String[] = [];
  @Input('chartType') doughnutChartType: String = ''; 

  /*public  doughnutChartColor: Color[] = {

  }*/


 /* public doughnutChartLabels: Label[] = [
    'Download Sales2',
    'In-Store Sales',
    'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    //[50, 150, 120],
    //[250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';*/

  constructor() { }

  ngOnInit(): void {
  }

}
