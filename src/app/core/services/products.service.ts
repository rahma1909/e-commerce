import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private readonly _httpclient=inject(HttpClient)


  // constructor() { }


getallproducts():Observable<any>{
  return this._httpclient.get(`${environment.baseUrl}/api/v1/products`)
}
  getspecificproducts(id:string |null):Observable<any>{
    return this._httpclient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
