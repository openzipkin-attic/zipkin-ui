import { Component } from '@angular/core';

import { Inject } from '@angular/core';
import { Span, Trace, Traces, ZipkinService } from './../zipkin/zipkin';
import * as moment from 'moment'

@Component({ selector: 'home', template: require('./home.component.html') })
export class HomeComponent {
    customTime: boolean;
    limit: number;
    minDuration: number;
    startDate: Date;
    endDate: Date;
    serviceName: string;

    constructor( @Inject(ZipkinService) private zipkin: ZipkinService) {
        this.limit = 10;
        this.minDuration = 0;
        this.startDate = moment().toDate();
        this.endDate = moment().subtract(1, "day").toDate();
        this.zipkin.getServices();
        this.load();
    }

    load() {

        let minDuration = this.minDuration == 0 ? "" : this.minDuration;
        let limit = this.limit;
        this.zipkin.getTraces(this.serviceName,this.startDate, this.endDate, limit, minDuration);
    }

    updateTimeRange(value: string) {
        if (value === "custom") {
            this.customTime = true;
        }
        else {
            this.customTime = false;
        }
    }

    find(serviceName: string, timerange: string, minDuration: string, limit: string, startDate: string, startTime: string, endDate: string, endTime: string) {
        if (timerange === "custom") {

        } else {
            this.startDate = moment().toDate();
            this.endDate = moment().subtract(timerange, "minutes").toDate();
        }
        this.serviceName = serviceName;
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
}
