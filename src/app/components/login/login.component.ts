import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _authservice = inject(AuthService);
  errMass: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],

    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  // loginForm: FormGroup = new FormGroup(
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

  loginSubmit(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this._authservice.setloginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          if (res.message == 'success') {
            setTimeout(() => {
              // set token in local storage
              localStorage.setItem('usertoken', res.token);
              // get savedata that contain all the token decoded and save in in property userdata
              this._authservice.saveData();
              // navigate to home
              this._router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errMass = err.error.message;
          console.log(this.errMass);
          this.isLoading = false;
        },
      });
    } else if (this.loginForm.invalid) {
      this.loginForm.get('rePassword')?.setErrors({ mismatch: true });
      this.loginForm.markAllAsTouched();
    }
  }
}
