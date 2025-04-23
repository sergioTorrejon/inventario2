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

export class SettingsService {
    private url: string = '';

    constructor (private http: HttpClient) {
        this.url = environment.api;
    }

    //#region CRUD
    /** DATA DOCUMENTOS PAGINADOS */
    getAll(model:string,dto:any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/${model}?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (dto.categoria === ''? ``: `&categoria=${dto.categoria}`) +
      (dto.marca === ''? ``: `&marca=${dto.marca}`) +
      (dto.modelo === ''? ``: `&modelo=${dto.modelo}`) +
      (dto.medida === ''? ``: `&medida=${dto.medida}`) +
      (dto.descripcion === ''? ``: `&descripcion=${dto.descripcion}`) 
      ).pipe();
    }

    getOne(nroIdentificacion:string,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/registros_funcionarios/consulta?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (nroIdentificacion === ''? ``: `&nroIdentificacion=${nroIdentificacion}`)
      ).pipe();
    }

    deleteRow(model:string,rowSelect: any) {
      let dialogMessage = this.dialog.open(MessageBoxComponent, this.deleteoptions);
      dialogMessage.afterClosed().subscribe((result1) => {
        if (result1 === 'confirm') {
          this.delete(model, rowSelect.id)
            .subscribe((data: any) => {
              this.openSnackBar('Se eliminó el registro correctamente','','warning')
            });
        }
      });
    }


    /**REPORTE EN CSV */
    getCsv(model:string,dto:any): Observable<any>
    {
      const returl = `${this.url}/${model}/download/csv?` +
      (dto.categoria === ''? ``: `&categoria=${dto.categoria}`) +
      (dto.marca === ''? ``: `&marca=${dto.marca}`) +
      (dto.modelo === ''? ``: `&modelo=${dto.modelo}`) +
      (dto.medida === ''? ``: `&medida=${dto.medida}`) +
      (dto.descripcion === ''? ``: `&descripcion=${dto.descripcion}`) 
      return this.http.get(returl, { responseType: "blob" } )
    }

    /** REPORTE EN PDF */
    getPdf(model:string,dto:any): Observable<any>
    {
      const returl = `${this.url}/${model}/download/pdf?` +
      (dto.categoria === ''? ``: `&categoria=${dto.categoria}`) +
      (dto.marca === ''? ``: `&marca=${dto.marca}`) +
      (dto.modelo === ''? ``: `&modelo=${dto.modelo}`) +
      (dto.medida === ''? ``: `&medida=${dto.medida}`) +
      (dto.descripcion === ''? ``: `&descripcion=${dto.descripcion}`) 
      return this.http.get(returl, { responseType: "blob" } )
    }
    //#region ENDCRUD

}
