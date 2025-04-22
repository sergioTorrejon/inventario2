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
import { CrudService } from 'src/app/services/crud/crud.service';

import { PersonasService } from '../../../personas.service';

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

  formControl:any=
  {
    'nroIdentificacion':  [this.data.data.nro_identificacion, [Validators.required]],
    'nombres':  [this.data.data.nombres, [Validators.required]],
    'primerApellido':  [this.data.data.primer_apellido, [Validators.required]],
    'segundoApellido': [this.data.data.segundo_apellido],
    'apellidoCasada':  [this.data.data.apellido_casada],
    'tipoIdentificacion': [this.data.data.tipo_identificacion, [Validators.required]],
    'fechaNacimiento': [this.data.data.fecha_nacimiento, Validators.required],
    'email': [this.data.data.email],
    'telefono': [this.data.data.telefono],
    'direccion':  [this.data.data.direccion],
  };

  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public restCrud: CrudService,
    public rest: PersonasService,
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
    this.restCrud.update('persona_natural', this.data.data.id, dto).
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
