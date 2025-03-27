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
import { CrudService } from 'src/app/services/crud/crud.service';

import { PersonasService } from '../../../personas.service';

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
  maxDate: Date;
  dataOptions=this.data.dataOptions ;
  file:any;

  formControl:any=
  {
    'nroIdentificacion':  ['', [Validators.required]],
    'paisOrigen':  ['', [Validators.required]],
    'nombres':  ['', [Validators.required]],
    'primerApellido':  ['', [Validators.required]],
    'segundoApellido': [''],
    'apellidoCasada':  [''],
    'tipoIdentificacion': ['ci', [Validators.required]],
    'fechaNacimiento': [null, Validators.required],
    'email': [''],
    'telefono': [null],
    'direccion':  [null],
  };

  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: PersonasService,
    public restCrud: CrudService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  )
  {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear -18, 0, 1);
    this.formGroup =this.formBuilder.group(this.formControl);
  }


  ngOnInit( )
  {

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
        this.restCrud.create('persona_natural', post).
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

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  close(data:any) {
    this.dialogRef.close(data);
  }
}
