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
            .get('http://localhost:9411/api/v1/traces?endTs=1473540618077&lookback=176418077', {})
            .subscribe(res => {
                this.traces = <Zipkin.Traces>(res.json());
            });
    }

    formatTime(time: number){
        return new Date(time/1000);
    }
}
