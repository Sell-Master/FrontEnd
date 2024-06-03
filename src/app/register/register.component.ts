import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MaterialModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  typeOptions = [
    { typeId: 1, description: 'ADMIN' },
    { typeId: 2, description: 'USER' },
    { typeId: 3, description: 'CLIENT' }
  ];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      typeId: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Request Body:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => console.log('User registered successfully!', response),
        error: (err) => console.error('Registration failed. Please try again.', err)
      });
    } else {
      console.error('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
