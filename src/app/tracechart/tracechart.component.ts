import {Component, ElementRef} from '@angular/core';
import { Inject, Input } from '@angular/core';
import { Span, Trace, Traces, Annotation, ZipkinService } from './../zipkin/zipkin';
import * as moment from 'moment';


@Component({ selector: 'tracechart', template: require('./tracechart.component.html') })
export class TraceChartComponent {
    @Input() trace: Trace
    minTime: number;
    maxTime: number;

    constructor() {

    }

    ngOnInit() {
        this.maxTime = Number.MIN_VALUE;
        this.minTime = Number.MAX_VALUE;
        this.trace.spans.forEach(span => {
            let annotations = span.annotations || [];
            annotations.forEach(annotation => {
                this.minTime = Math.min(this.minTime, annotation.timestamp);
                this.maxTime = Math.max(this.maxTime, annotation.timestamp);
            });
        });
        console.log(this.minTime + ", " + this.maxTime);
    }

    getSystemAnnotation(span: Span, name: string) {
        let annotations = span.annotations || [];
        let a = annotations.filter((v, i) => v.value == name);
        if (a.length == 0) {
            return 0;
        }
        let t = a[0].timestamp;
        return this.getPercent(t);
    }

    getCs1(span: Span) {
        return this.getSystemAnnotation(span, "cs");
    }
    getCs2(span: Span) {
        return this.getSystemAnnotation(span, "sr") - this.getSystemAnnotation(span, "cs");
    }

    getCr1(span: Span) {
        return this.getSystemAnnotation(span, "ss");
    }
    getCr2(span: Span) {
        return this.getSystemAnnotation(span, "cr") - this.getSystemAnnotation(span, "ss");
    }

    getSr(span: Span) {
        return this.getSystemAnnotation(span, "sr");
    }

    getSs(span: Span) {
        return this.getSystemAnnotation(span, "ss") - this.getSystemAnnotation(span, "sr");
    }

    getUserAnnotations(span: Span) {
        let annotations = span.annotations || [];
        let result = annotations.filter((v, i) => v.value != "cr" && v.value != "cs" && v.value != "sr" && v.value != "ss");
        return result;
    }
    formatSpanInfo(span: Span) {
        return moment.duration(span.duration / 1000).asMilliseconds() + " ms : " + span.name;
    }
    formatServiceName(span: Span) {
        return span.annotations[1].endpoint.serviceName;
    }

    getPercent(timestamp: number) {
        let total = this.maxTime - this.minTime;
        let current = timestamp - this.minTime;
        return Math.round(current / total * 100);
    }

    getAnnotation(annotation : Annotation) {
        return this.getPercent(annotation.timestamp);
    }
}
