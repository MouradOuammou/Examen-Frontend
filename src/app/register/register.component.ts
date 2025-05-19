// src/app/components/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ClientService } from '../../service/client.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  showClientInfo = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private clientService: ClientService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.showClientInfo = (role === 'USER');

      if (this.showClientInfo) {
        this.registerForm.get('nom')?.setValidators([Validators.required]);
        this.registerForm.get('email')?.setValidators([Validators.required, Validators.email]);
      } else {
        this.registerForm.get('nom')?.clearValidators();
        this.registerForm.get('email')?.clearValidators();
        this.registerForm.get('nom')?.setValue('');
        this.registerForm.get('email')?.setValue('');
      }
      this.registerForm.get('nom')?.updateValueAndValidity();
      this.registerForm.get('email')?.updateValueAndValidity();
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.f['role'].value === 'USER') {
      this.clientService.createClient({
        nom: this.f['nom'].value,
        email: this.f['email'].value
      }).pipe(first()).subscribe({
        next: (client) => {
          this.registerUser(client.id);
        },
        error: error => {
          this.error = error.error?.message || 'Erreur lors de la création du client';
          this.loading = false;
        }
      });
    } else {
      this.registerUser();
    }
  }

  private registerUser(clientId?: number) {
    this.authService.register({
      username: this.f['username'].value,
      role: this.f['role'].value,
      clientId: clientId
    }, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error: error => {
          this.error = error.error?.message || 'Erreur lors de l\'inscription';
          this.loading = false;
        }
      });
  }
}
