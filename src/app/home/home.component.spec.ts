import {addProviders, inject} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {ZipkinService} from '../zipkin/zipkin';
import {Http} from '@angular/http';

describe('HomeComponent', () => {
    beforeEach(() => addProviders([HomeComponent,ZipkinService]));

    it('should create the home component', inject([HomeComponent], (home: HomeComponent) => {
        expect(home).toBeTruthy();
    }));
});
