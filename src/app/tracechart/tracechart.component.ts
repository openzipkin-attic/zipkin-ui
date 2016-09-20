import {Component, OnInit} from '@angular/core';
import { Inject, Input } from '@angular/core';
import { Span, Trace, Annotation } from './../zipkin/zipkin';
import * as moment from 'moment';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'tracechart',
    template: require('./tracechart.component.html')
})
export class TraceChartComponent  implements OnInit {
    @Input() trace: Trace;
    minTime: number;
    maxTime: number;

    constructor(@Inject(NgbModal) private modal: NgbModal) {
    }

    open(content: any) {
        let options: NgbModalOptions = { 'size': 'lg' };
        this.modal.open(content, options);
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
        return this.getSystemAnnotation(span, 'cs');
    }
    getCs2(span: Span) {
        return this.getSystemAnnotation(span, 'sr') - this.getSystemAnnotation(span, 'cs');
    }

    getCr1(span: Span) {
        return this.getSystemAnnotation(span, 'ss');
    }
    getCr2(span: Span) {
        return this.getSystemAnnotation(span, 'cr') - this.getSystemAnnotation(span, 'ss');
    }

    getSr(span: Span) {
        return this.getSystemAnnotation(span, 'sr');
    }

    getSs(span: Span) {
        return this.getSystemAnnotation(span, 'ss') - this.getSystemAnnotation(span, 'sr');
    }

    getUserAnnotations(span: Span) {
        let annotations = span.annotations || [];
        let result = annotations.filter((v, i) => v.value != 'cr' && v.value != 'cs' && v.value != 'sr' && v.value != 'ss');
        return result;
    }

    getSpanDepth(span: Span) {
        return (span.depth * 10) + 'px';
    }

    toggleSpan(span: Span) {
        span.expanded = !span.expanded;
        this.trace.getSortedSpans();
    }

    formatServiceName(span: Span) {
        return span.annotations[1].endpoint.serviceName;
    }

    formatSpanDetails(span: Span) {
        var res = '';
        span.annotations.forEach(annotation => {
            res += annotation.value + ' ' + annotation.endpoint.serviceName + ' (' + annotation.endpoint.ipv4 + ':' + annotation.endpoint.port + ')' + '\r\n';
        });
        return res;
    }

    formatSpanInfo(span: Span) {
        return moment.duration(Math.round(span.duration / 1000)).asMilliseconds() + ' ms : ' + span.name;
    }

    formatDateTime(timestamp: number) {
        return moment(timestamp / 1000).format('YYYY-MM-DD - HH:mm:SS');
    }

    formatRelativeTime(timestamp: number) {
        return moment.duration((timestamp - this.minTime) / 1000).asMilliseconds() + ' MS';
    }

    getPercent(timestamp: number) {
        let total = this.maxTime - this.minTime;
        let current = timestamp - this.minTime;
        return Math.round(current / total * 100);
    }

    getAnnotation(annotation: Annotation) {
        return this.getPercent(annotation.timestamp);
    }

    time(no: number) {
        var total = this.maxTime - this.minTime;
        var part = total / 5;
        var res = Math.round(part * no / 1000);

        return moment.duration(res).asMilliseconds() + ' ms';
    }
}
