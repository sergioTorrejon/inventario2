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
  AuthorizationService,
} from 'src/app/authentication/services/authorization.service';
import {
  MessageBoxComponent,
} from 'src/app/components/dialogs/message-box/message-box.component';
import { CrudService } from 'src/app/services/crud/crud.service';

import { CategoriasService } from './categorias.service';
import { DialogInsertComponent } from './dialog-insert/dialog-insert.component';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import {
  CATEGORIAS_MODEL,
  queryGetData,
} from './model/categorias.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {

  // Variables del Formulario
  formGroup: UntypedFormGroup;

  model=CATEGORIAS_MODEL
  //sort
  sort: string = '';
  order: string = '';

  mo:string = ''

  //table
  page = {
    length: 10,
    size: 10,
    index: 0,
  };


  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public rest:  CategoriasService,
    public restCrud:  CrudService,
    public authorizationService: AuthorizationService,
    private _snackBar: MatSnackBar
    ) {
      this.formGroup =this.formBuilder.group([]);
      this.restCrud.getOptions().subscribe((data:any) => {
        this.model.dataOptions = data.data;
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

    sortData(event:any){
      this.sort = event.active;
      this.order = event.direction;
      if (this.order == ""){
        this.sort = 'id';
      }
      this.dataTableUpdate(this.page);
    }

    dataTableUpdate(event: any){
      this.page.size = event.pageSize !== undefined? event.pageSize: 10;
      this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
      const dataForm = (this.formGroup).getRawValue()
      const mo= this.model.name+'/'+dataForm.tipoCategoria
      const query = queryGetData(dataForm)
      this.restCrud.getData(mo,query,this.page.index+1, this.page.size,this.sort, this.order)
      .subscribe((data:any) => {
        const result = data.data
        this.model.data = result.data;
        this.model.count = result.count;
      });
    }

    insertRow()
    {
      let dialogRef = this.dialog.open(DialogInsertComponent, this.Dialog([]));
      dialogRef.afterClosed().subscribe((result:any) => {
        if (result.success === true) {
          this.openSnackBar(result.message,'','ok')
          this.dataTableUpdate(this.page);
        }
        if (result.success === false) {
          this.openSnackBar(result.message,'','error')
        }
      });
    }

    updateRow(rowSelect: any) {
      let dialogRef = this.dialog.open(DialogUpdateComponent, this.Dialog(rowSelect));
      dialogRef.afterClosed().subscribe((result) => {
        if (result.success === true) {
          this.openSnackBar(result.message,'','ok')
          this.dataTableUpdate(this.page);
        }
        if (result.success === false) {
          this.openSnackBar(result.message,'','error')
        }
      });
    }

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
              this.dataTableUpdate(this.page);
            });
        }
      });
    }

    Dialog(rowSelect: any) {
      var dialogConfig = new MatDialogConfig();
      dialogConfig.width = '1200px';
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        data: rowSelect,
        dataOptions:this.model.dataOptions
        };
      return dialogConfig
    }

    openSnackBar(message: string, action: string, type:string) {
      this._snackBar.open(message, action, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: [type]
      })
    }

}

