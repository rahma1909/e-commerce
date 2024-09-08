import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
private readonly _AuthService=inject(AuthService)
private readonly _router=inject(Router)
step:number=1;

verifyemail:FormGroup=new FormGroup({
email:new FormControl(null,[Validators.email,Validators.required])
})



verifycode:FormGroup= new FormGroup({
resetcode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])
})




resetpass:FormGroup= new FormGroup({
  email:new FormControl(null,[Validators.email,Validators.required]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
  })



  verifyEmailSubmit():void
{
this._AuthService.setEmailVerify(this.verifyemail.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.statusMsg==='success'){
      this.step=2
    }

  },
  error:(err)=>{
console.log(err);

  }
})
}
verifyCodeSubmit():void{
  this._AuthService.setCodeVerify(this.verifycode.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.statusMsg==='success'){
        this.step=3
      }

    },
    error:(err)=>{
  console.log(err);

    }
  })
}
resetPassSubmit():void{
  this._AuthService.resetPassword(this.resetpass.value).subscribe({
    next:(res)=>{
      console.log(res);
      localStorage.setItem('userToken',res.token)
      this._AuthService.saveData()
      this._router.navigate(['/home'])
    },
    error:(err)=>{
  console.log(err);

    }
  })
}
}
