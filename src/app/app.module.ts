import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {HomeComponent} from './home/home.component';
import {SearchBoxComponent} from './searchbox/searchbox.component';
import {TraceChartComponent} from './tracechart/tracechart.component';
import {TraceGraphComponent} from './tracegraph/tracegraph.component';
import {TraceListComponent} from './tracelist/tracelist.component';
import {TraceGroupListComponent} from './tracegrouplist/tracegrouplist.component';
import {JsonViewerComponent} from './jsonviewer/jsonviewer.component';
import {ZipkinService} from './zipkin/zipkin';
import {DependenciesComponent} from './dependencies/dependencies.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DependenciesComponent,
        TraceChartComponent,
        TraceGraphComponent,
        TraceListComponent,
        TraceGroupListComponent,
        SearchBoxComponent,
        JsonViewerComponent
    ],
    imports: [
        BrowserModule,
        Angular2FontawesomeModule,
        NgbModule.forRoot(),
        FormsModule,
        HttpModule,
        JsonpModule,
        routing,
    ],
    providers: [appRoutingProviders, ZipkinService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
