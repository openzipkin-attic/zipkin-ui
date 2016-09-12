import {Component, ElementRef} from '@angular/core';
import { Inject, Input } from '@angular/core';
import { Span, Trace, Traces, ZipkinService } from './../zipkin/zipkin';
import * as d3 from 'd3';

@Component({ selector: 'tracechart', template: require('./tracechart.component.html')})
export class TraceChartComponent {
    @Input() trace : Trace
    minTime : number;
    maxtime : number;

    constructor(){

    }

    ngOnInit() {
        this.maxtime = 0;
        this.minTime = 99999999999999999999999999;
        this.trace.forEach(span => {
            var annotations = span.annotations || [];
            annotations.forEach(annotation => {
                this.minTime = Math.min(this.minTime,annotation.timestamp);
                this.maxtime = Math.max(this.maxtime,annotation.timestamp);
            });
        });
        console.log(this.minTime + ", " + this.maxtime);
    }

    formatServiceName(span:Span) {
        return span.annotations[1].endpoint.serviceName;
    }
}
