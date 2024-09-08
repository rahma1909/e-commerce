import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}


  cartNumber:WritableSignal<number>=signal(0)


  myHeader: any = { token: localStorage.getItem('usertoken') };

  AddproductsToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      "productId": id,
    });
  }

  getproductsfromcart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  deleteProductsCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }
  updateProductsCart(id: string, newcount: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      count: newcount,
    });
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
