import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
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
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageBoxComponent } from 'src/app/components/dialogs/message-box/message-box.component';

import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-dialog-insert',
  templateUrl: './dialog-insert.component.html',
  styleUrls: ['./dialog-insert.component.css'],
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
export class DialogInsertComponent implements OnInit  {
  //Formularios
  formGroup: UntypedFormGroup;

  dataRow: any = [];

  dataOptions=this.data.dataOptions ;
  file:any;

  formControl:any=
  {
    'idTipoEmpresa':  [1, [Validators.required]],
    'codigo':  ['', [Validators.required , Validators.minLength(1), Validators.maxLength(4)]],
    'sigla':  ['', [Validators.required , Validators.minLength(1), Validators.maxLength(10)]],
    'nombre':  ['', [Validators.required , Validators.minLength(1), Validators.maxLength(250)]],
    'nombreCorto':  [null],
    'nroSeprem': [null],
    'nit': [null],
    'email': [null],
    'telefono': [null],
    'direccion': [null],
  };

  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: SolicitudesService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroup =this.formBuilder.group(this.formControl);
  }


  ngOnInit( )
  {

  }

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  onSubmit(post:any) {
    let dialogMessage = this.dialog.open(MessageBoxComponent, {
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
    });
    dialogMessage.afterClosed().subscribe((result1) => {
      if (result1 === 'confirm') {
        this.rest.create('empresa', post).
        subscribe((data:any) => {
          if (data.success === false) {
            this.openSnackBar(data.message,'','error')
          }
          else{
            this.close(data);
          }
        });
      }
    });

  }

  close(data:any) {
    this.dialogRef.close(data);
  }
}
