import { Component } from '@angular/core';

@Component({ selector: 'home', template: require('./home.component.html') })
export class HomeComponent {
    grouped: boolean = false;

    setListView() {
        this.grouped = false;
    }

    setGroupView() {
        this.grouped = true;
    }
}
