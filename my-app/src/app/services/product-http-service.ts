import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IPProduct } from '../classes/IPProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {
  private _url: string = "dataset/products.json";

  constructor(private _http: HttpClient) { }

  getProductsList(): Observable<IPProduct[]> {
    return this._http.get<IPProduct[]>(this._url);
  }
}
