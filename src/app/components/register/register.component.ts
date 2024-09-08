import { Component, inject, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _authservice = inject(AuthService);
  errMass: string = '';
  isLoading: boolean = false;
  registersub!:Subscription

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
    },
    { validators: this.confirmPass }
  );

  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),

  //     rePassword: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   this.confirmPass
  // );

  confirmPass(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  registerSubmit(): void {
    this.isLoading = true;
    if (this.registerForm.valid) {
   this.registersub=   this._authservice.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          if (res.message == 'success') {
            setTimeout(() => {
              this._router.navigate(['/login']);
            }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errMass = err.error.message;
          console.log(this.errMass);
          this.isLoading = false;
        },
      });
    } else if (this.registerForm.invalid) {
      this.registerForm.get('rePassword')?.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
this.registersub.unsubscribe()

  }
}
