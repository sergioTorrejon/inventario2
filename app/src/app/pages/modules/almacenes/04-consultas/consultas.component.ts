import {
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  AuthenticationService,
} from 'src/app/authentication/services/authentication.service';
import {
  AuthorizationService,
} from 'src/app/authentication/services/authorization.service';
import { CrudService } from 'src/app/services/crud/crud.service';

import {
  DialogDetalleComponent,
} from './dialog-detalle/dialog-detalle.component';
import { CONSULTAS } from './model/consultas.model';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class ConsultasComponent implements OnInit {
  // CONFIGURACION 
  model=CONSULTAS

  // Variables del Formulario
  formGroup: UntypedFormGroup;

  columns = this.model.columns

  //table
  data: any =[];
  count = 0;

  //sort
  sort: string = 'id';
  order: string = 'desc';
  page = {
    size: 10,
    index: 0
  };


  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public restCrud: CrudService,
    
    public authorizationService: AuthorizationService,
    public authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
    ) {
      this.formGroup =this.formBuilder.group([]);
    }

  ngOnInit() {
    this.setForm();
  }

  setForm(){
    this.formGroup =this.formBuilder.group(this.model.formControl);
    this.dataTableUpdate(this.page);
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
    const formValid = this.formGroup.controls['nombres'].valid || this.formGroup.controls['nroIdentificacion'].valid || this.formGroup.controls['apellidos'].valid
    if(formValid){
            this.page.size = event.pageSize !== undefined? event.pageSize: 10;
            this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
            this.restCrud.getPersonasConsulta((this.formGroup).getRawValue(),this.page.index+1, this.page.size,this.sort, this.order)
            .subscribe((data:any) => {
              const result = data.data
              this.data = result.data;
              this.count = result.count;
            });
    }
    this.data = [];
    this.count = 0;

  }

  openDetalle(rowSelect: any) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: rowSelect
    };
     let dialogRef = this.dialog.open(DialogDetalleComponent, dialogConfig);
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

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }
}

