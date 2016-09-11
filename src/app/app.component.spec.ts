import {addProviders, inject} from '@angular/core/testing';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
    beforeEach(() => addProviders([AppComponent]));

    it('should create the app component', inject([AppComponent], (app: AppComponent) => {
        expect(app).toBeTruthy();
    }));
});
