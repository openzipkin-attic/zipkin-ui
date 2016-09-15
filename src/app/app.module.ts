import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {HomeComponent} from './home/home.component';
import {TraceChartComponent} from './tracechart/tracechart.component';
import {ZipkinService} from './zipkin/zipkin';
import {DependenciesComponent} from './dependencies/dependencies.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DependenciesComponent,
        TraceChartComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [appRoutingProviders,ZipkinService],
    bootstrap: [AppComponent]
})

export class AppModule {
}

