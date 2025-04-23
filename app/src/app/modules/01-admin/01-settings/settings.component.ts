import {
  Component,
  OnInit,
} from '@angular/core';

import {
  AuthenticationService,
} from 'src/app/authentication/services/authentication.service';
import { AuthorizationService } from 'src/app/authentication/services/authorization.service';
import { SettingsService } from './settings.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogInsertComponent } from './formularios/dialog-insert/dialog-insert.component';
import { DialogUpdateComponent } from './formularios/dialog-update/dialog-update.component';
import { MessageBoxComponent } from 'src/app/components/message-box/message-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  // MODEL
  name:'settings'
  title:'Settings'
  
  //CAMPOS DEL FOMRULARIO DE BUSQUEDA
  formControl:{
    categoria:[''],
    marca:[''],
    modelo:[''],
    medida:[''],
    descripcion:['']
  }

  //table
  data: any =[];
  count = 0;

  //sort
  sort: string = '';
  order: string = 'desc';
  page = {
    size: 10,
    index: 0
  };

  //CAMPOS DE LAS COLUMNAS DE LAS TABLAS
  columnsTable:
  [
    {name:'codigo', label:'Codigo', width:10},
    {name:'categoria', label:'Categoria',  width:10},
    {name:'marca', label:'Marca',  width:10},
    {name:'medida', label:'Medida',  width:20},
    {name:'modelo', label:'Modelo',  width:20},
    {name:'descripcion', label:'Descripción',  width:20},
  ]  

  // Variables del Formulario
  formGroup: UntypedFormGroup;  
  
  constructor(
    public authorizationService: AuthorizationService,
    public authenticationService: AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public service: SettingsService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit() {this.setForm()}

  setForm(){
    this.formGroup =this.formBuilder.group(this.formControl);
    this.formOnchange();
    this.dataTableUpdate(this.page);
  }

  formOnchange(){
    this.formGroup.valueChanges.subscribe(async data => {
      this.dataTableUpdate(this.page);
    })
  }

  // ORDENAR LA TABLA
  sortData(event:any){
    this.sort = event.active;
    this.order = event.direction;
    if (this.order == ""){
      this.sort = 'id';
    }
    this.dataTableUpdate(this.page);
  }

  //ACTUALIZA LA TABLA DEL MÓDULO
  dataTableUpdate(event: any){
    this.page.size = event.pageSize !== undefined? event.pageSize: 10;
    this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
    var searchDto = (this.formGroup).getRawValue()
    this.service.getAll(this.name,searchDto,this.page.index+1, this.page.size,this.sort, this.order)
    .subscribe((data:any) => {
      const result = data.data
      this.data = result.data;
      this.count = result.count;
    });
  }

  //#region CRUD
  //FUNCIÓN PARA ABRIR LA VENTANA DE INSERTAR
  insertRow()
  {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { model:this.name};
    let dialogRef = this.dialog.open(DialogInsertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result.success === true) {
        this.openSnackBar(result.message,'','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
      if (result.success === false) {
        this.openSnackBar(result.message,'','error')
      }
    });
  }

  //FUNCIÓN PARA ABRIR LA VENTANA DE ACTUALIZAR
  updateRow(rowSelect: any) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: rowSelect
    };
    let dialogRef = this.dialog.open(DialogUpdateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success === true) {
        this.openSnackBar(result.message,'','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
      if (result.success === false) {
        this.openSnackBar(result.message,'','error')
      }
    });
  }

  //FUNCIÓN PARA ELIMINAR
  deleteRow(rowSelect: any) {
    let dialogMessage = this.dialog.open(MessageBoxComponent, {
      disableClose: true,
      autoFocus: true,
      data: {
        cancelarBtn: true,
        aceptarBtn: true,
        titulo: 'Mensaje',
        descripcion: 'Se eliminara el registro Seleccionado',
      },
    });
    dialogMessage.afterClosed().subscribe((result1) => {
      if (result1 === 'confirm') {
        this.restCrud.delete(this.model.name, rowSelect.id)
        .subscribe((data: any) => {
          this.openSnackBar('Se eliminó el registro correctamente','','warning')
          this.dataTableUpdate({ pageSize: 10, pageIndex: 0, sort: '' });
        });
      }
    });
  }

  //ABRIR LA CONFIRMACION 
  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  // DESCARGAR EN EXCEL
  downloadCsv() {
    const dto = (this.formGroup).getRawValue();
    console.log('---------------------------------------------DTO para pdf',dto)
    this.service.getCsv('productos',dto)
    .subscribe((result: any) => {
      var newBlob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const data = window.URL.createObjectURL(newBlob);
      const link = document.createElement('a');
      link.href = data;
      link.download = "Reporte.xlsx";
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      setTimeout(function () {
          window.URL.revokeObjectURL(data);
      }, 100);
    }, (error: any) => {
      console.log(error);
    });
  }

  // DESCARGAR EN PDF
  downloadpdf() {
    const dto = (this.formGroup).getRawValue();
    console.log('---------------------------------------------DTO para pdf',dto)
    this.service.getPdf('productos',dto)
    .subscribe((result: any) =>  {
      var newBlob = new Blob([result], { type: "application/pdf" });
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download = "Reporte.pdf";
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
      }, 100);
    }, (error: any) => {
      console.log(error);
    });
  }
  //#region END CRUD
}

