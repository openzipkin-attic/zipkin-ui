import {addProviders, inject} from '@angular/core/testing';

import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
    beforeEach(() => addProviders([HomeComponent]));

    it('should create the Home component', inject([HomeComponent], (app: HomeComponent) => {
        expect(app).toBeTruthy();
    }));
});
