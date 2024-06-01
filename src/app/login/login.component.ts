import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoginComponent {
  constructor(private router: Router) { }

  onLogin() {
    this.router.navigate(['/home']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
