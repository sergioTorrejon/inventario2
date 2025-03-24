import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class  SolicitudesService {
    private url: string = '';

    constructor (private http: HttpClient) {
        this.url = environment.api;
    }

    /** DATA DOCUMENTOS PAGINADOS */
      getData(model,dto: any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
      {
        console.log('getSolicitudes dto', dto)
        return this.http.get<any[]>(`${this.url}/${model}?` +
        (page === 0? ``: `&page=${page}`) +
        (limit === 0? ``: `&limit=${limit}`) +
        (sort === ''? ``: `&sort=${sort}`) +
        (order === ''? ``: `&order=${order}`) +
        (dto.registroBaja === ''? ``: `&registroBaja=${dto.id}`)
        ).pipe();
      }

    //#region CRUD
      /** INSERT CON FORMDATA */
      create(model: string, dto: any): Observable<any> {
        return this.http.post(`${this.url}/${model}`, dto).pipe();
      }

      /** MODIFICACION CON FORMDATA */
      update(model: string, id: number, dto: any): Observable<any> {
        return this.http.put(`${this.url}/${model}/${id}`, dto).pipe();
      }

      getSolicitudes(dto:any, page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
      {
        console.log('getSolicitudes dto', dto)
        return this.http.get<any[]>(`${this.url}/solicitudes`
        ).pipe();
      }

      updated( data: any): Observable<any> {
        return this.http.put(`${this.url}/${data.Id}`, data).pipe();
      }
    //#endregion
}
