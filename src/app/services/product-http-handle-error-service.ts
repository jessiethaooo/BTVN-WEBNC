import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { IPProduct } from '../classes/IPProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpHandleErrorService {
    private _url:string="/datasets/products.json"
    constructor(private _http: HttpClient) { }

  getProductsList(): Observable<IPProduct[]> {
    return this._http.get<IPProduct[]>(this._url)
                    .pipe(
                        retry(3),
                        catchError (this.handleError)
    )
  }
  handleError(error: HttpErrorResponse)
  {
    return throwError(()=> new Error(error.message))
  }
}

