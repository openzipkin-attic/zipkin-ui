import {Component, OnInit} from '@angular/core';
import {nvD3} from 'ng2-nvd3'
declare let d3: any;

@Component({
  selector: 'tracegraph',
  directives: [nvD3],
  template: `
    <div>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `
})

export class TraceGraphComponent implements OnInit{
  options : any;
  data : any;
  ngOnInit(){
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: (d : any) => d.label,
        y: (d : any) => d.value,
        showValues: true,
        valueFormat: (d:any) => d3.format(',.4f')(d),
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    }
    this.data = [
      {
        key: "Cumulative Return",
        values: [
          {
            "label" : "A" ,
            "value" : -29.765957771107
          } ,
          {
            "label" : "B" ,
            "value" : 0
          } ,
          {
            "label" : "C" ,
            "value" : 32.807804682612
          } ,
          {
            "label" : "D" ,
            "value" : 196.45946739256
          } ,
          {
            "label" : "E" ,
            "value" : 0.19434030906893
          } ,
          {
            "label" : "F" ,
            "value" : -98.079782601442
          } ,
          {
            "label" : "G" ,
            "value" : -13.925743130903
          } ,
          {
            "label" : "H" ,
            "value" : -5.1387322875705
          }
        ]
      }
    ];
  }
}
