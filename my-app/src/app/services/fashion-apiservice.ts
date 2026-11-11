import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../classes/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {
    constructor(private _http: HttpClient) { }
    getFashions():Observable<Fashion[]>
    {
      return this._http.get<Fashion[]>("/fashions").pipe(
          retry(3),
          catchError(this.handleError))
    }
    handleError(error:HttpErrorResponse){
      const message = error.error?.message || error.message;
      return throwError(()=>new Error(message))
    }
    getFashion(id:string):Observable<Fashion>
    {
      return this._http.get<Fashion>("/fashions/"+id).pipe(
          retry(3),
          catchError(this.handleError))
    }
    getFashionByIdF(id: number):Observable<Fashion>
    {
      return this._http.get<Fashion>("/fashions/idf/"+id).pipe(
          retry(3),
          catchError(this.handleError))
    }
    getFashionBySlug(slug:string):Observable<Fashion>
    {
      return this._http.get<Fashion>("/fashions/slug/"+encodeURIComponent(slug)).pipe(
          retry(3),
          catchError(this.handleError))
    }
    postFashion(aFashion:Fashion):Observable<Fashion>
    {
      return this._http.post<Fashion>("/fashions",aFashion).pipe(
          catchError(this.handleError))
    }
    putFashion(aFashion:Fashion):Observable<Fashion>
    {
      return this._http.put<Fashion>("/fashions",aFashion).pipe(
          catchError(this.handleError))
    }
    deleteFashion(fashionId:string):Observable<Fashion>
    {
      return this._http.delete<Fashion>("/fashions/"+fashionId).pipe(
          catchError(this.handleError))
    }



}
