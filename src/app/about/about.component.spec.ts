import {addProviders, inject} from '@angular/core/testing';

import {AboutComponent} from './about.component';

describe('AboutComponent', () => {
    beforeEach(() => addProviders([AboutComponent]));

    it('should create the About component', inject([AboutComponent], (app: AboutComponent) => {
        expect(app).toBeTruthy();
    }));
});
