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
} from 'src/app/components/dialogs/message-box/message-box.component';
import { CrudService } from 'src/app/services/crud/crud.service';
import {
  DialogInsertComponent,
} from './formularios/dialog-insert/dialog-insert.component';
import {
  DialogUpdateComponent,
} from './formularios/dialog-update/dialog-update.component';
import { PROVEDORES } from './model/provedores.model';
import { ProvedoresService } from './provedores.service';

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.component.html',
  styleUrls: ['./provedores.component.css'],
})
export class ProvedoresComponent implements OnInit {

//GLOBALS
  dateToday= new Date()



  // CONFIGURACION
  model=PROVEDORES
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

  columns = this.isAdministrator?this.model.columns:this.model.columnsOperador


  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public rest: ProvedoresService,
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
      this.restCrud.getEmpresas().subscribe((data:any) => {
        this.empresas = data.data;
      });
    }

  ngOnInit() {
      this.setForm();
  }

  setForm(){
    this.isAdministrator = this.authenticationService.GetRoles().includes('administrador')
      this.formGroup =this.formBuilder.group(this.model.formControl);
      this.formOnchange();
      this.dataTableUpdate(this.page);
  }

  formOnchange(){
      this.formGroup.valueChanges.subscribe(async data => {
        this.dataTableUpdate(this.page);
      })

      this.formGroup.controls['tipoEmpresa'].valueChanges.subscribe(async data => {
        this.formGroup.controls['codEmpresa'].setValue('');
        this.restCrud.getEmpresas(data).subscribe((data:any) => {
          this.empresas = data.data;
        });
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
      this.rest.getFuncionarios('registros_funcionarios',(this.formGroup).getRawValue(),this.page.index+1, this.page.size,this.sort, this.order)
      .subscribe((data:any) => {
        const result = data.data
        this.data = result.data;
        this.count = result.count;
      });
  }

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
        this.restCrud.delete(this.formGroup.controls.model.value, rowSelect.id)
        .subscribe((data: any) => {
          this.openSnackBar('Se eliminó el registro correctamente','','warning')
          this.dataTableUpdate({ pageSize: 10, pageIndex: 0, sort: '' });
        });
      }
    });
  }

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  downloadCsv() {
    const dto = (this.formGroup).getRawValue();
    this.rest.getCsv('registros_funcionarios',dto)
    .subscribe((result: any) => {
        var newBlob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.download = "Reporte rms.xlsx";
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
            window.URL.revokeObjectURL(data);
        }, 100);
    }, (error: any) => {
        console.log(error);
    });
  }

  downloadpdf() {
      const dto = (this.formGroup).getRawValue();
      this.rest.getPdf('registros_funcionarios',dto)
    .subscribe((result: any) =>  {
      var newBlob = new Blob([result], { type: "application/pdf" });
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download = "Reporte rms.pdf";
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      setTimeout(function () {
          window.URL.revokeObjectURL(data);
      }, 100);
    }, (error: any) => {
        console.log(error);
    });
  }
}

