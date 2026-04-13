import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
export let ProfileComponent = class ProfileComponent {
    constructor(auth) {
        this.auth = auth;
        this.currentUser = null;
        this.message = '';
    }
    ngOnInit() {
        this.auth.currentUser$.subscribe(user => {
            this.currentUser = user;
        });
    }
    logout() {
        this.auth.logout();
        this.currentUser = null;
        this.message = 'You have been logged out.';
    }
};
ProfileComponent = __decorate([
    Component({
        selector: 'app-profile',
        standalone: true,
        imports: [CommonModule, RouterModule],
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    })
], ProfileComponent);
//# sourceMappingURL=profile.component.js.map