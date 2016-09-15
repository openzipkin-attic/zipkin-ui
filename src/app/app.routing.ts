import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {DependenciesComponent} from './dependencies/dependencies.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dependencies', component: DependenciesComponent },
];

export const appRoutingProviders: any[] = [{provide: LocationStrategy, useClass: HashLocationStrategy}];

export const routing = RouterModule.forRoot(appRoutes);
