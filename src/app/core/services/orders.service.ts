import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import { Itoken } from '../interfaces/itoken';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  myheaders: any = { token: localStorage.getItem('usertoken') };

  decodedToken: Itoken=jwtDecode(localStorage.getItem('usertoken')!);

  constructor(private _HttpClient: HttpClient) {}

  checkOut(id: string | null, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.urlServer}`,
      {
        shippingAddress: shippingAddress,
      },
     
    );
  }

  getUserOrders(id:string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${id}`
    );

  }


  }

