import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
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
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  _closeDialogVia,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.css'],
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
export class DialogUpdateComponent implements OnInit {

  //Formularios
  formGroup: UntypedFormGroup;

  dataOptions=this.data.dataOptions ;
  file:any;
  //fileUpload: ElementRef;

  formControl:any=
  {
    'idTipoEmpresa':  [this.data.data.id_tipo_empresa, [Validators.required]],
    'codigo':  [this.data.data.codigoempresa, [Validators.required , Validators.minLength(1), Validators.maxLength(4)]],
    'sigla':  [this.data.data.sigla, [Validators.required , Validators.minLength(1), Validators.maxLength(10)]],
    'nombre':  [this.data.data.nombre, [Validators.required , Validators.minLength(1), Validators.maxLength(250)]],
    'nombreCorto':  [this.data.data.nombre_corto],
    'nroSeprem': [this.data.data.nro_seprem],
    'nit': [this.data.data.nit],
    'email': [this.data.data.email],
    'telefono': [this.data.data.telefono],
    'direccion': [this.data.data.direccion],
  };

  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: SolicitudesService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar

  )
  {
    this.formGroup =this.formBuilder.group(this.formControl);
  }

  async ngOnInit( )
  {

  }

  onSubmit(post:any) {
    const {codigo,...dto}=post
    this.rest.update('empresa', this.data.data.id, dto).
    subscribe((data:any) => {
      this.close('confirm');
    });
  }

  close(state:string) {
    this.dialogRef.close(state);
  }

//SNACKBAR
  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  formatDate(date:Date) {
    const dateFormat = new Date(date);
       const auxMax = dateFormat.getFullYear() + '-12-31';
       const auxMin = dateFormat.getFullYear() + '-01-31';
       const max =  new Date(auxMax);
       const min =  new Date(auxMin);
       return {max:max,min:min}
  }
}
