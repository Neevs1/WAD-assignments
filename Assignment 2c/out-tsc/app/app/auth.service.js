import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export let AuthService = class AuthService {
    constructor() {
        this.storageKey = 'wad_users';
        this.currentUserKey = 'wad_current_user';
        this.users = [];
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.loadUsersFromStorage();
        const stored = localStorage.getItem(this.currentUserKey);
        this.currentUserSubject = new BehaviorSubject(stored ? JSON.parse(stored) : null);
    }
    loadUsersFromStorage() {
        const stored = localStorage.getItem(this.storageKey);
        this.users = stored ? JSON.parse(stored) : [];
    }
    saveUsersToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.users));
    }
    register(username, email, password) {
        const existing = this.users.find(u => u.username === username || u.email === email);
        if (existing) {
            throw new Error('Username or email already in use.');
        }
        this.users.push({ username, email, password });
        this.saveUsersToStorage();
        this.currentUserSubject.next({ username, email });
        localStorage.setItem(this.currentUserKey, JSON.stringify({ username, email }));
    }
    login(usernameOrEmail, password) {
        const user = this.users.find(u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);
        if (!user) {
            throw new Error('Invalid login credentials.');
        }
        const profile = { username: user.username, email: user.email };
        this.currentUserSubject.next(profile);
        localStorage.setItem(this.currentUserKey, JSON.stringify(profile));
    }
    logout() {
        this.currentUserSubject.next(null);
        localStorage.removeItem(this.currentUserKey);
    }
    getUser() {
        return this.currentUserSubject.value;
    }
};
AuthService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthService);
//# sourceMappingURL=auth.service.js.map