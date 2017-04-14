import {Component, ElementRef, OnInit, Inject} from '@angular/core';
import * as d3 from 'd3';
// import dagreD3 from 'dagre-d3'
import { Http } from '@angular/http';

@Component({
    selector: 'tracegraph',
    template: ``,
})

export class TraceGraphComponent implements OnInit {
    baseUrl: string;

    constructor( @Inject(ElementRef) private element: ElementRef, @Inject(Http) private http: Http) {
        this.baseUrl = process.env.ZIPKIN_BASE_URL || ''; // default to same origin
    }

    ngOnInit() {

        this
            .http
            .get(`${this.baseUrl}/api/v1/dependencies?endTs=1474206961061&lookback=86400000`, {})
            .subscribe(res => {
                let zip = <any>(res.json());

                let links = zip.map((v: any) => ({
                    source: v['parent'],
                    target: v['child'],
                    type: 'suit'
                }));

                let nodes: { [key: string]: any } = {};

                // Compute the distinct nodes from the links.
                links.forEach((link: any) => {
                    link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
                    link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
                });

                let width = 960;
                let height = 500;

                // Use elliptical arc path segments to doubly-encode directionality.
                let tick = function () {
                    path.attr('d', linkArc);
                    circle.attr('transform', transform);
                    text.attr('transform', transform);
                };

                let linkArc = function (d: any) {
                    let dx = d.target.x - d.source.x;
                    let dy = d.target.y - d.source.y;
                    let dr = Math.sqrt(dx * dx + dy * dy);
                    return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
                };

                let transform = (d: any) => `translate(${d.x},${d.y})`;

                let force = d3.layout.force()
                    .nodes(d3.values(nodes))
                    .links(links)
                    .size([width, height])
                    .charge(-300)
                    .gravity(0.05)
                    .friction(0.9)
                    .linkDistance(120)
                    .on('tick', tick)
                    .start();

                let svg = d3.select(this.element.nativeElement).append('svg')
                    .attr('width', '100%')
                    .attr('height', height);

                // Per-type markers, as they don't inherit styles.
                svg.append('defs').selectAll('marker')
                    .data(['suit', 'licensing', 'resolved'])
                    .enter().append('marker')
                    .attr('id', (d: any) => d)
                    .attr('viewBox', '0 -5 10 10')
                    .attr('refX', 15)
                    .attr('refY', -1.5)
                    .attr('markerWidth', 10)
                    .attr('markerHeight', 10)
                    .attr('orient', 'auto')
                    .append('path')
                    .attr('d', 'M0,-5L10,0L0,5');

                let path = svg.append('g').selectAll('path')
                    .data(force.links())
                    .enter().append('path')
                    .attr('class', (d: any) => 'link ' + d.type)
                    .attr('marker-end', (d: any) => 'url(#' + d.type + ')');

                let circle = svg.append('g').selectAll('circle')
                    .data(force.nodes())
                    .enter().append('circle')
                    .attr('r', 12)
                    .call(force.drag);

                let text = svg.append('g').selectAll('text')
                    .data(force.nodes())
                    .enter().append('text')
                    .attr('dy', 12 + 15)
                    .attr('text-anchor', 'middle')
                    .text((d: any) => d.name);


                var k = 0;
                while ((force.alpha() > 1e-2) && (k < 550)) {
                    (<any>force).tick();
                    k = k + 1;
                }
            });
    }
}
