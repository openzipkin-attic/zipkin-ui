import { Injectable, Inject} from '@angular/core';
import * as moment from 'moment';
import { Http } from '@angular/http';

export interface Endpoint {
    serviceName: string;
    ipv4: string;
    port: number;
}

export interface Annotation {
    timestamp: any;
    value: string;
    isJson: boolean;
    json: any;
    endpoint: Endpoint;
}

export interface BinaryAnnotation {
    key: string;
    value: string;
    endpoint: Endpoint;
}

export interface Span {
    traceId: string;
    id: string;
    name: string;
    parentId: string;
    timestamp: number;
    duration: number;
    annotations: Annotation[];
    binaryAnnotations: BinaryAnnotation[];
    parent: Span;
    children: Span[];
    expanded: boolean;
    depth: number;
}

export class Trace {
    expanded: boolean = false;
    spans: Span[] = [];
    id: string;
    name: string;
    color: string;
    root: Span;
    constructor(spans: Span[]) {
        this.root = spans[0];
        this.name = this.root.annotations[1].endpoint.serviceName;
        this.id = this.root.traceId;

        let lookup: { [id: string]: Span } = {};
        spans.forEach(span => {
            span.expanded = true;
            span.children = [];
            lookup[span.id] = span;
        });
        var error = false;
        var uniqueId = '';
        spans.forEach(span => {
            if (span.parentId) {
                span.parent = lookup[span.parentId];
                if (span.parent == undefined) {
                    console.log(span.parentId);
                    error = true;
                } else {
                    span.parent.children.push(span);
                }

            } else {
                span.parent = null;
            }
            span.annotations = span.annotations || [];
            span.binaryAnnotations = span.binaryAnnotations || [];
            span.annotations.forEach(a => {
                a.json = this.getAnnotationJson(a.value);
                a.isJson = a.json != null;
            });
        });

        let sortedSpans = this.getSortedSpans();
        sortedSpans.forEach(span => {
            uniqueId += span.name + span.annotations[0].endpoint.serviceName;
        });
        if (error) {
            this.color = '#ff0000';
        } else {
            this.color = '#' + Math.abs(this.hashString(uniqueId)).toString(16).substr(0, 6);
        }
    }

     getAnnotationJson(value: string) {
        if (value.startsWith('{') || value.startsWith('[')) {
            try {
                let res = JSON.parse(value);
                return res;
            } catch (x) {
                return null;
            }
        }
        return null;
    }

    getSortedSpans() {
        this.spans = [];
        this.sortTrace(this.root, 0);
        return this.spans;
    }

    hashString(str: string) {
        var hash = 0, i: number, chr: number, len: number;
        if (str.length === 0) { return hash; }
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    formatTimestamp() {
        return moment(this.spans[0].timestamp / 1000).fromNow();
    }

    formatDuration() {
        return moment.duration(this.spans[0].duration / 1000).humanize();
    }

    expandedText() {
        if (this.expanded) {
            return '-';
        } else {
            return '+';
        }
    }

    toggleTrace() {
        this.expanded = !this.expanded;
    }

    sortTrace(span: Span, depth: number) {
        span.depth = depth;
        this.spans.push(span);
        span.children.sort((a, b) => a.annotations[0].timestamp - b.annotations[0].timestamp);
        if (span.expanded) {
            span.children.forEach(child => {
                this.sortTrace(child, depth + 1);
            });
        }
    }
}


@Injectable()
export class ZipkinService {
    traces: Trace[];
    baseUri: string;
    services: string[];

    constructor( @Inject(Http) private http: Http) {
        this.baseUri = 'localhost';
        this.traces = null;
    }

    getServices() {
        this
            .http
            .get(`http://${this.baseUri}:9411/api/v1/services`, {})
            .subscribe(res => {
                this.services = <string[]>(res.json());
                this.services.push('[any]');
                this.services.sort();
            });
    }



    getTraces(serviceName: string, startDate: Date, endDate: Date, limit: number, minDuration: string | number) {
        let endTs = startDate.getTime();
        let lookback = endTs - endDate.getTime();

        var uri = `http://${this.baseUri}:9411/api/v1/traces?endTs=${endTs}&lookback=${lookback}&annotationQuery=&limit=${limit}&minDuration=${minDuration}&spanName=all`;
        if (serviceName != undefined && serviceName != '[any]') {
            uri += `&serviceName=${serviceName}`;
        }

        this
            .http
            .get(uri, {})
            .subscribe(res => {
                let traces = <Span[][]>(res.json());

                this.traces = traces.map(spans => new Trace(spans));
            });
    }

    hasTraces() {
        return this.traces != null && this.traces.length > 0;
    }
}

