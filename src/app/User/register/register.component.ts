import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Shared/service/auth.service';
import { RegisterDto } from '../../Interfaces/AuthInterface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  // Injecting AuthService and FormBuilder
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  // Initializing the form with validators
  constructor() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$',
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatch },
    );
  }

  private passwordMatch(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  // Handling form submission
  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      alert('Please fill all required fields correctly');
      return;
    }

    const registerData: RegisterDto = {
      fullName: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    };
    // Call the register method from AuthService
    this.authService.register(registerData).subscribe({
      next: (response) => {
        alert('✅ ' + response.message);

        if (response.message === 'Registration successful!') {
          this.registerForm.reset();
        }
      },
      error: (error) => {
        alert('❌ ' + error.message || 'Registration failed');
      },
    });
  }
}
