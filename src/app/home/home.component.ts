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
    customTime: boolean;

    constructor( @Inject(Http) http: Http) {
        this.http = http;

        this.limit = 10;
        this.minDuration = 0;
        this.startDate = moment().toDate();
        this.endDate = moment().subtract(1, "day").toDate();
        this.load();
    }

    load() {

        let endTs = this.startDate.getTime();
        let lookback = endTs - this.endDate.getTime();
        let uri = `http://localhost:9411/api/v1/traces?endTs=${endTs}&lookback=${lookback}`;
        console.log(uri);
        this
            .http
            .get(uri, {})
            .subscribe(res => {
                this.traces = <Zipkin.Traces>(res.json());
            });
    }

    updateTimeSpan(value: string) {
        if (value === "custom") {
            this.customTime = true;
        }
        else {
            this.customTime = false;
        }
    }

    find(timespan: string, minDuration: string, limit: string, startDate: string, startTime: string, endDate: string, endTime: string) {
        if (timespan === "custom") {

        } else {
            this.startDate = moment().toDate();
            this.endDate = moment().subtract(timespan, "minutes").toDate();
        }
        this.limit = +limit;
        this.minDuration = +minDuration;

        this.load();
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
