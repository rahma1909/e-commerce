import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }


 getAllCategories(): Observable<any>{
  return  this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }
  getSpecificCategories(id:string | null): Observable<any>{
    return  this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
    }



}
