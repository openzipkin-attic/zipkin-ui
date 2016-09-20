import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { ZipkinService } from './../zipkin/zipkin';
import * as moment from 'moment';

@Component({ selector: 'tracelist', template: require('./tracelist.component.html') })
export class TraceListComponent {
    constructor( @Inject(ZipkinService) private zipkin: ZipkinService) {
    }

    formatTime(date: Date) {
        return moment(date).format('HH:mm');
    }

    formatDate(date: Date) {
        return moment(date).format('YYYY-MM-DD');
    }
}
