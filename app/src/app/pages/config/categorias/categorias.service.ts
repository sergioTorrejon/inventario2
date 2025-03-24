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
export class CategoriasService {
    private url: string = '';

    constructor (private http: HttpClient) {
        this.url = environment.api;
    }

    /** CARTAS RESOLUCIONES */
    /** DATA DOCUMENTOS PAGINADOS */
    getData(model,dto: any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/${model}?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`) +
      (dto.tipoEmpresa === ''? ``: `&tipoEmpresa=${dto.tipoEmpresa}`) +
      (dto.nombreEmpresa === ''? ``: `&nombreEmpresa=${dto.nombreEmpresa}`) 
      ).pipe();
    }

    getDataPrueba(model,query: string,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/${model}?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`) +
      (query === ''? ``: `${query}`) 
      ).pipe();
    }

    /** CATALOGOS */
    /** TRAE LISTA DE OPCIONES DE CATALOGOS PARA SELECT */
    /** TRAE LISTA DE OPCIONES DE CATALOGOS PARA SELECT */
      getOptions(): Observable<any> {
        return this.http.get(`${this.url}/catalogo/options`).pipe();
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

    //#endregion

    //#endregion
    formatDate(date:Date) {
      const dateFormat = new Date(date);
         return dateFormat.getFullYear() + '-' + (dateFormat.getMonth()+1) + '-' + dateFormat.getDate();
    }
}
