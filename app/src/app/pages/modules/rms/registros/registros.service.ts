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
export class RegistrosService {
    private url: string = '';

    constructor (private http: HttpClient) {
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

    getConsultaFuncionario(nroIdentificacion:string,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/registros_funcionarios/consulta?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (nroIdentificacion === ''? ``: `&nroIdentificacion=${nroIdentificacion}`)
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

      /**REPORTE EN CSV */
      getCsv(model:string,dto:any):  Observable<any>
      {
        const returl = `${this.url}/${model}/downloadcsv?` +
        (dto.estado === ''? ``: `&estado=${dto.estado}`) +
        (dto.tipoCargo === ''? ``: `&tipoCargo=${dto.tipoCargo}`) +
        (dto.cargo === ''? ``: `&cargo=${dto.cargo}`) +
        (dto.fechaIngreso === ''? ``: `&fechaIngreso=${this.formatDate(dto.fechaIngreso)}`) +
        (dto.nroIdentificacion === ''? ``: `&nroIdentificacion=${dto.nroIdentificacion}`) +
        (dto.nombres === ''? ``: `&nombres=${dto.nombres}`) +
        (dto.apellidos === ''? ``: `&apellidos=${dto.apellidos}`)+
        (dto.tipoEmpresa === ''? ``: `&tipoEmpresa=${dto.tipoEmpresa}`)+
        (dto.codEmpresa === ''? ``: `&codEmpresa=${dto.codEmpresa}`)
        return this.http.get(returl, { responseType: "blob" } )
      }

      /** REPORTE EN PDF */
      getPdf(model:string,dto:any):  Observable<any>
      {
        const returl = `${this.url}/${model}/downloadpdf?` +
        (dto.estado === ''? ``: `&estado=${dto.estado}`) +
        (dto.tipoCargo === ''? ``: `&tipoCargo=${dto.tipoCargo}`) +
        (dto.cargo === ''? ``: `&cargo=${dto.cargo}`) +
        (dto.fechaIngreso === ''? ``: `&fechaIngreso=${this.formatDate(dto.fechaIngreso)}`) +
        (dto.nroIdentificacion === ''? ``: `&nroIdentificacion=${dto.nroIdentificacion}`) +
        (dto.nombres === ''? ``: `&nombres=${dto.nombres}`) +
        (dto.apellidos === ''? ``: `&apellidos=${dto.apellidos}`)+
        (dto.tipoEmpresa === ''? ``: `&tipoEmpresa=${dto.tipoEmpresa}`)+
        (dto.codEmpresa === ''? ``: `&codEmpresa=${dto.codEmpresa}`)
        return this.http.get(returl, { responseType: "blob" } )
      }

//#region CRUD

    formatDate(date:Date) {
      const dateFormat = new Date(date);
         return dateFormat.getFullYear() + '-' + (dateFormat.getMonth()+1) + '-' + dateFormat.getDate();
    }

}
