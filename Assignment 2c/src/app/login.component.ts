import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usernameOrEmail = '';
  password = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.message = '';
    try {
      this.auth.login(this.usernameOrEmail.trim(), this.password);
      this.message = 'Login successful. Redirecting to profile...';
      setTimeout(() => this.router.navigate(['/profile']), 800);
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Login failed.';
    }
  }
}
