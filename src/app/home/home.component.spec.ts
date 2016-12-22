import {TestBed, inject} from '@angular/core/testing';
import {ZipkinService} from '../zipkin/zipkin';
import {Http} from '@angular/http';

import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
    beforeEach(() =>
               TestBed.configureTestingModule({
                   providers: [
                       HomeComponent
                   ]
               }).compileComponents()
              );

    it('should create the home component', inject([HomeComponent], (home: HomeComponent) => {
        expect(home).toBeTruthy();
    }));
});
