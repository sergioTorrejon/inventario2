import {
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  AuthenticationService,
} from 'src/app/authentication/services/authentication.service';
import { AuthorizationService } from 'src/app/authentication/services/authorization.service';
import {
  MessageBoxComponent,
} from 'src/app/components/message-box/message-box.component';
import { CrudService } from 'src/app/services/crud/crud.service';
import {
  DialogInsertComponent,
} from './formularios/dialog-insert/dialog-insert.component';
import {
  DialogUpdateComponent,
} from './formularios/dialog-update/dialog-update.component';
import { marcasProducto, medidasProducto, MODEL, tipoCategoriaProducto } from './model/productos.model';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {

//GLOBALS
  dateToday= new Date()


  // MODEL
  model=MODEL


  tipoCategoriaProducto= tipoCategoriaProducto
  marcasProducto = marcasProducto
  medidasProducto = medidasProducto



  // Variables del Formulario
  formGroup: UntypedFormGroup;

  isAdministrator=this.authenticationService.GetRoles().includes('administrador')
  empresas: any = [];
  dataOptions: any = [];


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

  columnsTable = this.model.columnsTable


  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public rest: ProductosService,
    public restCrud: CrudService,
    public authorizationService: AuthorizationService,
    public authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
    ) {
      this.formGroup =this.formBuilder.group([]);

      this.restCrud.getOptions().subscribe((data:any) => {
        this.model.dataOptions = data.data;
        this.dataOptions = this.model.dataOptions;
      });
    }

  ngOnInit() {
      this.setForm();
  }

  setForm(){
      this.formGroup =this.formBuilder.group(this.model.formControl);
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
      this.rest.getAll(this.model.name,searchDto,this.page.index+1, this.page.size,this.sort, this.order)
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
    dialogConfig.data = { model:this.model
    };
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
    this.rest.getCsv('productos',dto)
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

      this.rest.getPdf('productos',dto)
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

}

