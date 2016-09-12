import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {TraceComponent} from './trace/trace.component';
import {TraceChartComponent} from './tracechart/tracechart.component';
import {ZipkinService} from './zipkin/zipkin';
import {DependenciesComponent} from './dependencies/dependencies.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        TraceComponent,
        DependenciesComponent,
        TraceChartComponent
    ],
    imports: [
        BrowserModule,
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
