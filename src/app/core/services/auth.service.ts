import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpclint = inject(HttpClient);
  private readonly _Router = inject(Router);
  userdata: any = null;

  constructor() {}

  setRegisterForm(date: object): Observable<any> {
    return this._httpclint.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      date
    );
  }
  setloginForm(date: object): Observable<any> {
    return this._httpclint.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      date
    );
  }
  saveData(): void {
    if (localStorage.getItem('usertoken') !== null) {
      this.userdata = jwtDecode(localStorage.getItem('usertoken')!);
    }
  }


  logOut():void{
    localStorage.removeItem('usertoken')
    this.userdata=null
    this._Router.navigate(['/login'])
  }



  setEmailVerify(data:object):Observable<any>{
    return this._httpclint.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` ,data)
  }
  setCodeVerify(data:object):Observable<any>{
    return this._httpclint.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` ,data)
  }
  resetPassword(data:object):Observable<any>{
    return this._httpclint.put(`${environment.baseUrl}/api/v1/auth/resetPassword` ,data)
  }
}
