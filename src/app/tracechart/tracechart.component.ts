import {Component, OnInit} from '@angular/core';
import { Inject, Input } from '@angular/core';
import { Span, Trace, Annotation } from './../zipkin/zipkin';
import * as moment from 'moment';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'tracechart',
    template: require('./tracechart.component.html')
})
export class TraceChartComponent implements OnInit {
    @Input() trace: Trace;
    minTime: number;
    maxTime: number;
    static systemAnnotations: string[] = ['cr', 'cs', 'sr', 'ss', 'ws', 'wr', 'srf', 'ssf', 'crf', 'csf'];
    static systemAnnotationNames: { [key: string]: string } = {
        'sr': 'Server Receive',
        'ss': 'Server Send',
        'srf': 'Server Receive Fragment',
        'ssf': 'Server Send Fragment',
        'cr': 'Client Receive',
        'cs': 'Client Send',
        'crf': 'Client Receive Fragment',
        'csf': 'Client Send Fragment',
        'ws': 'Wire Send',
        'wr': 'Wire Receive'
    };

    constructor( @Inject(NgbModal) private modal: NgbModal) {
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
        let result = annotations.filter((v, i) => !TraceChartComponent.systemAnnotations.includes(v.value));
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
        span.annotations.forEach(a => {
            res += `${a.value} ${a.endpoint.serviceName} (${a.endpoint.ipv4}:${a.endpoint.port})`;
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
        return moment.duration((timestamp - this.minTime) / 1000).asMilliseconds() + ' ms';
    }

    annotationIsJson(value: string) {
        if (value.startsWith('{') || value.startsWith('[')) {
            try {
                JSON.parse(value);
                return true;
            } catch (x) {
                return false;
            }

        }
        return false;
    }

    formatAnnotation(value: string) {
        return TraceChartComponent.systemAnnotationNames[value] || value;
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
