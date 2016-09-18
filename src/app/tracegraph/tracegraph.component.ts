import {Component, ElementRef, OnInit, Inject} from '@angular/core';
import * as d3 from 'd3'
@Component({
    selector: 'tracegraph',
    template: '<h1>D3.js Integrated if background is yellow</h1>',
})
export class TraceGraphComponent implements OnInit {

    constructor(@Inject(ElementRef) private element: ElementRef) {
    }
    ngOnInit() {
        console.log("afterViewInit() called");
        d3.select(this.element.nativeElement).select("h1").style("background-color", "yellow");
    }
}
