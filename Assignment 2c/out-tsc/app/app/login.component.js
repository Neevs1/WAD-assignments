import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
export let LoginComponent = class LoginComponent {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
        this.usernameOrEmail = '';
        this.password = '';
        this.message = '';
        this.error = '';
    }
    submit() {
        this.error = '';
        this.message = '';
        try {
            this.auth.login(this.usernameOrEmail.trim(), this.password);
            this.message = 'Login successful. Redirecting to profile...';
            setTimeout(() => this.router.navigate(['/profile']), 800);
        }
        catch (err) {
            this.error = err instanceof Error ? err.message : 'Login failed.';
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        standalone: true,
        imports: [CommonModule, FormsModule],
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
//# sourceMappingURL=login.component.js.map