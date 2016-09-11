import { Component } from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import { Inject } from '@angular/core';
import { Zipkin } from './../zipkin/zipkin';
import * as moment from 'moment'

@Component({ selector: 'home', template: require('./home.component.html') })
export class HomeComponent {
    http: Http;
    traces: Zipkin.Traces;
    limit: number;
    minDuration: number;
    startDate: Date;
    endDate: Date;

    constructor( @Inject(Http) http: Http) {
        this.http = http;
        this.load();
        this.limit = 10;
        this.minDuration = 0;
        this.startDate = moment().toDate();
        this.endDate = moment().subtract(1, "day").toDate();
    }

    load() {

        this
            .http
            .get('http://localhost:9411/api/v1/traces?endTs=1473586880399&lookback=3600000', {})
            .subscribe(res => {
                this.traces = <Zipkin.Traces>(res.json());
            });
    }

    find(){
        console.log("hello");
    }

    formatTime(date: Date) {
        return moment(date).format('HH:mm');
    }

    formatDate(date: Date) {
        return moment(date).format('YYYY-MM-DD');
    }

    formatTraceName(trace: Zipkin.Trace) {
        return trace[0].annotations[0].endpoint.serviceName;
    }

    formatTraceTimestamp(trace: Zipkin.Trace) {
        return moment(trace[0].timestamp / 1000).fromNow();
    }

    formatTraceDuration(trace: Zipkin.Trace) {
        return moment.duration(trace[0].duration / 1000).humanize();
    }
}
