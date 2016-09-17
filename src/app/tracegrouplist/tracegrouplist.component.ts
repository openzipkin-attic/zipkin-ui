import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { ZipkinService, Trace } from './../zipkin/zipkin';
import * as moment from 'moment'

export class TraceGroup {
    constructor(public key: string, public traces: Trace[],public name:string, public color:string) { }
}
@Component({ selector: 'tracegrouplist', template: require('./tracegrouplist.component.html') })
export class TraceGroupListComponent {
    constructor( @Inject(ZipkinService) private zipkin: ZipkinService) {
    }

    getGroupedTraces() {
        let traces = this.zipkin.traces || [];
        let groups: { [key: string]: Trace[] } = {};
        traces.forEach(trace => {
            let key = trace.name + trace.color;
            let arr: Trace[] = groups[key] || [];
            arr.push(trace);
            groups[key] = arr;
        });

        let res: TraceGroup[] = [];
        for (let key in groups) {
            let traces = groups[key];
            res.push(new TraceGroup(key, traces,traces[0].name, traces[0].color ));
        }
        return res;
    }

    formatTime(date: Date) {
        return moment(date).format('HH:mm');
    }

    formatDate(date: Date) {
        return moment(date).format('YYYY-MM-DD');
    }
}
