import { Component } from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import { Inject } from '@angular/core';
import { Zipkin } from './../zipkin/zipkin';

@Component({ selector: 'home', template: require('./home.component.html') })
export class HomeComponent {
    http: Http;
    traces: Zipkin.Traces;

    constructor( @Inject(Http) http: Http) {
        this.http = http;
        this.load();
    }

    load() {
        this
            .http
            .get('http://localhost:9411/api/v1/traces?endTs=1473586880399&lookback=3600000', {})
            .subscribe(res => {
                this.traces = <Zipkin.Traces>(res.json());
            });
    }

    formatTime(time: number){
        let current = new Date();
        let timestamp = new Date(time/1000);
        return this.timeDifference(current,timestamp);
    }

    timeDifference(current : any, previous : any) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}
}
