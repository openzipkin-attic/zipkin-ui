import { Injectable, Inject} from '@angular/core';
import * as moment from 'moment'
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';

export interface Endpoint {
    serviceName: string;
    ipv4: string;
    port: number;
}

export interface Annotation {
    timestamp: any;
    value: string;
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
}

export class Trace {
    expanded: boolean = false;
    spans: Span[] = [];
    id: string;
    name: string;
    constructor(spans: Span[]) {
        let root = spans[0];
        this.name = root.annotations[1].endpoint.serviceName;
        this.id = root.traceId;

        let lookup: { [id: string]: Span } = {};
        spans.forEach(span => {
            span.expanded = true;
            span.children = [];
            lookup[span.id] = span;
        });

        spans.forEach(span => {
            if (span.parentId) {
                span.parent = lookup[span.parentId];
                span.parent.children.push(span);
            }
            else {
                span.parent = null;
            }
        });

        this.sortTrace(root);
    }

    formatTimestamp() {
        return moment(this.spans[0].timestamp / 1000).fromNow();
    }

    formatDuration() {
        return moment.duration(this.spans[0].duration / 1000).humanize();
    }

    expandedText() {
        if (this.expanded) {
            return "-";
        } else {
            return "+";
        }
    }

    toggleTrace() {
        this.expanded = !this.expanded;
    }

    sortTrace(span: Span) {
        this.spans.push(span);
        span.children.sort((a, b) => a.annotations[0].timestamp - b.annotations[0].timestamp);
        span.children.forEach(child => {
            this.sortTrace(child);
        });
    }
}

export type Traces = Trace[]

@Injectable()
export class ZipkinService {
    traces: Traces;

    services: string[];

    constructor( @Inject(Http) private http: Http) {

    }

    getServices() {
        this
            .http
            .get("http://localhost:9411/api/v1/services", {})
            .subscribe(res => {
                this.services = <string[]>(res.json());
                this.services.push("[any]");
                this.services.sort();
            });
    }

    getTraces(serviceName: string, startDate: Date, endDate: Date, limit: number, minDuration: string | number) {
        let endTs = startDate.getTime();
        let lookback = endTs - endDate.getTime();

        var uri = `http://localhost:9411/api/v1/traces?endTs=${endTs}&lookback=${lookback}&annotationQuery=&limit=${limit}&minDuration=${minDuration}&spanName=all`;
        if (serviceName != undefined && serviceName != "[any]") {
            uri += `&serviceName=${serviceName}`
        }

        console.log(uri);
        this
            .http
            .get(uri, {})
            .subscribe(res => {
                let traces = <Span[][]>(res.json());

                this.traces = traces.map(spans => new Trace(spans));
            });
    }
}

