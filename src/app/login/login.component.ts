import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/api/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('User logged in successfully!', response);
          this.authService.getUserByEmail(this.loginForm.value.email).subscribe({
            next: (user) => {
              if (user) {
                sessionStorage.setItem('user-details', JSON.stringify(user));
                this.redirectUser(user);
              } else {
                console.error('User not found.');
              }
            },
            error: (err) => console.error('Failed to fetch user details.', err)
          });
        },
        error: (err) => console.error('Login failed. Please try again.', err)
      });
    }
  }  

  redirectUser(user: any) {
    const userType = user.typeOfUser.description;
    if (userType === 'CLIENT') {
      this.router.navigate(['/ecommerce']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
