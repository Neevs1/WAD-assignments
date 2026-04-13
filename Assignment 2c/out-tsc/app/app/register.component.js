import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
export let RegisterComponent = class RegisterComponent {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
        this.username = '';
        this.email = '';
        this.password = '';
        this.message = '';
        this.error = '';
    }
    submit() {
        this.error = '';
        this.message = '';
        try {
            this.auth.register(this.username.trim(), this.email.trim(), this.password);
            this.message = 'Registration successful. Redirecting to profile...';
            setTimeout(() => this.router.navigate(['/profile']), 800);
        }
        catch (err) {
            this.error = err instanceof Error ? err.message : 'Registration failed.';
        }
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        standalone: true,
        imports: [CommonModule, FormsModule],
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
//# sourceMappingURL=register.component.js.map