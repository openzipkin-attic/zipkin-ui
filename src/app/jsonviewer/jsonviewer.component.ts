import {Component, Input} from '@angular/core';


@Component({
    selector: 'jsonviewer',
    template: `
    <span [ngSwitch]="valueKind(json)">
        <template [ngSwitchCase]="'object'">
            {{ '{' }}
            <table style="margin-left:20px;">
                <tr *ngFor="let item of iterateObject(json) #last = last">
                    <td>
                        <b style="vertical-align:top">{{item.key}}: </b>
                        <jsonviewer [json]="item.value"></jsonviewer> <span *ngIf="!last">,</span>
                    </td>
                </tr>
            </table>
            {{ '}' }}
        </template>
        <template [ngSwitchCase]="'array'">
        [
            <table style="margin-left:20px;">
                <tr *ngFor="let item of json #last = last">
                    <td><jsonviewer [json]="item"></jsonviewer> <span *ngIf="!last">,</span></td>
                </tr>
            </table>
        ]
        </template>
        <span *ngSwitchCase="'string'" style="color:green" >"{{json}}"</span>
        <span *ngSwitchCase="'boolean'" style="color:blue">{{json}}</span>
        <span *ngSwitchCase="'number'" style="color:blue">{{json}}</span>
        <span *ngSwitchCase="'null'" style="color:red">null</span>
        <span *ngSwitchDefault>{{valueKind(json)}}</span>
    </span>
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

    valueKind(obj: any) {
        if (this.isNull(obj)) {
            return 'null';
        }
        if (this.isArray(obj)) {
            return 'array';
        }
        if (this.isObject(obj)) {
            return 'object';
        }
        if (this.isString(obj)) {
            return 'string';
        }
        if (this.isBoolean(obj)) {
            return 'boolean';
        }
        if (this.isNumber(obj)) {
            return 'number';
        }
        return 'unknown';
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
        return obj === true || obj === false;
    }
    isNumber(obj: any) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    }
}
