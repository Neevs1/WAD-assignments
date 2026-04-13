import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  username: string;
  email: string;
}

interface UserAccount {
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'wad_users';
  private currentUserKey = 'wad_current_user';
  private users: UserAccount[] = [];
  private currentUserSubject!: BehaviorSubject<UserProfile | null>;
  currentUser$!: import('rxjs').Observable<UserProfile | null>;

  constructor() {
    this.loadUsersFromStorage();
    const stored = localStorage.getItem(this.currentUserKey);
    this.currentUserSubject = new BehaviorSubject<UserProfile | null>(
      stored ? JSON.parse(stored) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private loadUsersFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    this.users = stored ? JSON.parse(stored) : [];
  }

  private saveUsersToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }

  register(username: string, email: string, password: string) {
    const existing = this.users.find(u => u.username === username || u.email === email);
    if (existing) {
      throw new Error('Username or email already in use.');
    }
    this.users.push({ username, email, password });
    this.saveUsersToStorage();
    this.currentUserSubject.next({ username, email });
    localStorage.setItem(this.currentUserKey, JSON.stringify({ username, email }));
  }

  login(usernameOrEmail: string, password: string) {
    const user = this.users.find(
      u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );
    if (!user) {
      throw new Error('Invalid login credentials.');
    }
    const profile: UserProfile = { username: user.username, email: user.email };
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
}
