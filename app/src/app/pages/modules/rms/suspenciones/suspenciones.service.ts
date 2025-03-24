import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class SuspencionesService {
    private url: string = '';

    constructor (private http: HttpClient,
      private _snackBar: MatSnackBar) {
        this.url = environment.api;
    }

    /** DATA DOCUMENTOS PAGINADOS */
    getFuncionarios(model:string,dto:any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/${model}?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (dto.estado === ''? ``: `&estado=${dto.estado}`) +
      (dto.tipoCargo === ''? ``: `&tipoCargo=${dto.tipoCargo}`) +
      (dto.cargo === ''? ``: `&cargo=${dto.cargo}`) +
      (dto.fechaIngreso === ''? ``: `&fechaIngreso=${this.formatDate(dto.fechaIngreso)}`) +
      (dto.nroIdentificacion === ''? ``: `&nroIdentificacion=${dto.nroIdentificacion}`) +
      (dto.nombres === ''? ``: `&nombres=${dto.nombres}`) +
      (dto.apellidos === ''? ``: `&apellidos=${dto.apellidos}`)+
      (dto.tipoEmpresa === ''? ``: `&tipoEmpresa=${dto.tipoEmpresa}`)+
      (dto.codEmpresa === ''? ``: `&codEmpresa=${dto.codEmpresa}`)
      ).pipe();
    }

    getSelect(dto:any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/registros_funcionarios/select?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (dto.persona === ''? ``: `&persona=${dto.id}`)
      ).pipe();
    }

    getPersonas(dto:any ,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any> {
      return this.http.get(`${this.url}/persona_natural?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (dto.nombres === ''? ``:dto.nombres.length <=3?``: `&nombres=${dto.nombres}`) +
      (dto.nroIdentificacion === ''? ``:dto.nroIdentificacion.length <=3?``: `&nroIdentificacion=${dto.nroIdentificacion}`)

      ).pipe();
    }

    getEmpresas(tipoEmpresa:number=0):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/empresa/listOptions?` +
      (tipoEmpresa === 0? ``: `&tipoEmpresa=${tipoEmpresa}`)
      ).pipe();
    }

    confirmHechosPosteriores(idHechoPosterior:number,dto:any):  Observable<any>
    {
      console.log(dto)
      return this.http.get<any[]>(`${this.url}/registros_hechos_posteriores/confirm/${idHechoPosterior}?`+
      (dto.estado === ''? ``: `estado=${dto.estado}`)+
      (dto.observaciones === ''? ``: `&observaciones=${dto.observaciones}`)
      ).pipe();
    }

//#region CRUD

    /** TRAE LISTA DE OPCIONES DE CATALOGOS PARA SELECT */
    getOptions(): Observable<any> {
        return this.http.get(`${this.url}/catalogo/options`).pipe();
    }

    getById(model: string, id: number ):  Observable<any> {
      return this.http.get(`${this.url}/${model}/${id}`).pipe();
    }

    /** INSERT CON FORMDATA */
    create(model: string, data: any): Observable<any> {
        return this.http.post(`${this.url}/${model}`, data).pipe();
    }

   /** MODIFICACION CON FORMDATA */
    update(model: string, id: number, dto: any): Observable<any> {
        return this.http.put(`${this.url}/${model}/${id}`, dto).pipe();
    }

   /** ELIMINACION LOGICA */
    delete(model: string, id: number): Observable<any> {
        return this.http.delete(`${this.url}/${model}/${id}`);
    }

//#endregion

    formatDate(date:Date) {
      const dateFormat = new Date(date);
         return dateFormat.getFullYear() + '-' + (dateFormat.getMonth()+1) + '-' + dateFormat.getDate();
    }

}
