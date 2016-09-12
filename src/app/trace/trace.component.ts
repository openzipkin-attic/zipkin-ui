import {Component} from '@angular/core';
import { Inject } from '@angular/core';
import { Span, Trace, Traces, ZipkinService } from './../zipkin/zipkin';

@Component({ selector: 'trace', template: require('./trace.component.html')})
export class TraceComponent {

    constructor(@Inject(ZipkinService) private zipkin : ZipkinService){

    }
}
