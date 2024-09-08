import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}


 myheader={token:localStorage.getItem('usertoken')!}


  addProductToWish(id:string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
       "productId":id
     },
    {
      headers:this.myheader
    })
  }

removeProductFromWish(productId:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`,
    {
      headers:this.myheader
    })
}


getWishList():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,
    {
      headers:this.myheader
    })
}


}
