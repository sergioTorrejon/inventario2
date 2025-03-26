import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { DataService } from '../data/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageBoxComponent } from 'src/app/components/dialogs/message-box/message-box.component';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class CrudService {
    private url: string = '';
    public deleteoptions:any = {
      disableClose: true,
      autoFocus: true,
      data: {
        cancelarBtn: true,
        aceptarBtn: true,
        titulo: 'Mensaje',
        descripcion: 'Se eliminara el registro Seleccionado',
      },
    }

    public inserteoptions:any = {
      height: '200px',
      width: '600px',
      disableClose: true,
      autoFocus: true,
      data: {
        cancelarBtn: true,
        aceptarBtn: true,
        titulo: 'Mensaje',
        descripcion: 'Se realizara el registro',
      },
    }


    constructor (private http: HttpClient,
      private dialog: MatDialog,
      private _snackBar: MatSnackBar,
      public dataService:DataService) {
        this.url = environment.api;
    }

    /** CATALOGOS */
    /** TRAE LISTA DE OPCIONES DE CATALOGOS PARA SELECT */
    getConfig(model:string): Observable<any> {
      return this.http.get(`${this.url}/${model}/config`).pipe(
        tap(console.log),
        catchError(this.handleError)
      );
    }

/*     getConfigPromise(model:string): Observable<any> {
      return this.http.get(`${this.url}/${model}/config`).
    } */

    getMenu(): Observable<any> {
      return this.http.get(`${this.url}/menu`).pipe();
    }

    getOptions(): Observable<any> {
      return this.http.get(`${this.url}/catalogo/options`).pipe();
    }

    getData(model,query: string,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/${model}?` +
      //(query === ''? ``: `${query}`)+ 
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`) 
      ).pipe();
    }

    getById(model: string, id: number ):  Observable<any> {
      return this.http.get(`${this.url}/${model}/${id}`).pipe();
    }


    /** INSERT CON FORMDATA */
    create(model: string, dto: any): Observable<any> {
      return this.http.post(`${this.url}/${model}`, dto).pipe();
    }


    /** MODIFICACION CON FORMDATA */
    update(model: string, id: number, dto: any): Observable<any> {
      return this.http.put(`${this.url}/${model}/${id}`, dto).pipe();
    }

    /** ELIMINACION LOGICA */
    delete(model: string, id: number): Observable<any> {
      return this.http.delete(`${this.url}/${model}/${id}`);
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

    Dialog(rowSelect: any) {
      var dialogConfig = new MatDialogConfig();
      dialogConfig.width = '1200px';
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      return dialogConfig
    }
  
    Open(result: any) {
      if (result.success === true) {
        this.openSnackBar(result.message,'','ok')
      }
      if (result.success === false) {
        this.openSnackBar(result.message,'','error')
      }
    }

    openSnackBar(message: string, action: string, type:string) {
      this._snackBar.open(message, action, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: [type]
      })
    }

    
    getPersonas(dto:any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/persona_natural?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (dto.nroIdentificacion === ''? ``:dto.nroIdentificacion.length <=3?``: `&nroIdentificacion=${dto.nroIdentificacion}`)+
      (dto.nombreCompleto === ''? ``:dto.nombreCompleto.length <=3?``: `&nombreCompleto=${dto.nombreCompleto}`) 
      ).pipe();
    }

    getPersonasConsulta(dto:any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/persona_natural?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (dto.nroIdentificacion === ''? ``: `&nroIdentificacionConsulta=${dto.nroIdentificacion}`) +
      (dto.nombres === ''? ``: `&nombresConsulta=${dto.nombres}`) +
      (dto.apellidos === ''? ``: `&apellidosConsulta=${dto.apellidos}`)
      ).pipe();
    }


    private handleError (error:Response) {
       // TODO: send the error to remote logging infrastructure
       console.error(error); // log to console instead

       // TODO: better job of transforming error for user consumption
       const msg = 'Error status code'+error.status + 'status'+ error.statusText

       // Let the app keep running by returning an empty result.
       return throwError(msg);
    }
      



}
