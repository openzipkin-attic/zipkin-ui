import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {TraceComponent} from './trace/trace.component';
import {AboutComponent} from './about/about.component';
import {DependenciesComponent} from './dependencies/dependencies.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'trace/:traceId', component: TraceComponent },
    { path: 'dependencies', component: DependenciesComponent },
];

export const appRoutingProviders: any[] = [{provide: LocationStrategy, useClass: HashLocationStrategy}];

export const routing = RouterModule.forRoot(appRoutes);
