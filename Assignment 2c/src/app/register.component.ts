import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.message = '';
    try {
      this.auth.register(this.username.trim(), this.email.trim(), this.password);
      this.message = 'Registration successful. Redirecting to profile...';
      setTimeout(() => this.router.navigate(['/profile']), 800);
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Registration failed.';
    }
  }
}
