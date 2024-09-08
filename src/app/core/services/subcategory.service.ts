import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  constructor(private _HttpClient: HttpClient) {}

  getAllSubCategories(id: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/categories/${id}/subcategories`
    );
  }

  getspaSubCategories(id: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/subcategories/${id}`
    );
  }
}
