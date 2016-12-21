import {TestBed, inject} from '@angular/core/testing';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
    beforeEach(() =>
               TestBed.configureTestingModule({
                   providers: [AppComponent],
               }).compileComponents()
              );

    it('should create the app component', inject([AppComponent], (app: AppComponent) => {
        expect(app).toBeTruthy();
    }));
});
