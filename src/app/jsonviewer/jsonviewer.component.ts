import {Component, Inject, Input} from '@angular/core';


@Component({
    selector: 'jsonviewer',
    template: `
    <span *ngIf="isObject(json)">
        {{ '{' }}
        <table>
            <tr *ngFor="let item of iterateObject(json)">
                <td>
                    <b style="vertical-align:top">{{item.key}}: </b>
                    <div style="display:inline-block"><jsonviewer [json]="item.value"></jsonviewer></div> ,
                </td>
            </tr>
        </table>
        {{ '}' }}
    </span>
    <span *ngIf="isArray(json)">
    [
        <table>
            <tr *ngFor="let item of json">
                <td><jsonviewer [json]="item"></jsonviewer> ,</td>
            </tr>
        </table>
    ]
    </span>
    <span style="color:green" *ngIf="isString(json)">"{{json}}"</span>
    <span style="color:blue" *ngIf="isBoolean(json)">{{json}}</span>
    <span style="color:blue" *ngIf="isNumber(json)">{{json}}</span>
    <span style="color:red" *ngIf="isNull(json)">null</span>
    `
})
export class JsonViewerComponent {
    @Input() json: any;
    constructor() {
    }

    iterateObject(obj: any) {
        let res: { key: string, value: any }[] = [];
        for (let key in obj) {
            let value = obj[key];
            res.push({ key: key, value: value });
        }
        return res;
    }

    isNull(obj: any) {
        return obj == null;
    }
    isArray(obj: any) {
        return !this.isNull(obj) && obj instanceof Array;
    }
    isObject(obj: any) {
        return !this.isNull(obj) && obj instanceof Object && !this.isArray(obj);
    }
    isString(obj: any) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    isBoolean(obj: any) {
        return obj instanceof Boolean;
    }
    isNumber(obj: any) {
        return !this.isArray(obj) && !this.isObject(obj) && !this.isString(obj) && !this.isBoolean(obj);
    }
}
