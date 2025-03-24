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
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageBoxComponent } from 'src/app/components/dialogs/message-box/message-box.component';
import { CrudService } from 'src/app/services/crud/crud.service';

import { RegistrosService } from '../../registros.service';

@Component({
  selector: 'app-dialog-baja-insert',
  templateUrl: './dialog-baja-insert.component.html',
  styleUrls: ['./dialog-baja-insert.component.css'],
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
export class DialogBajaInsertComponent implements OnInit  {
 //prueba

  //Formularios
  formGroup: UntypedFormGroup;

  dataOptions: any = [] ;
  optionsBaja: any = [] ;

  columnsSelect: any =
  [
    {name:'nro_identificacion', label:'Nro. Identificación',  width:20},
    {name:'nombres', label:'Nombres',  width:15},
    {name:'primer_apellido', label:'Primer Apellido',  width:15},
    {name:'segundo_apellido', label:'Segundo Apellido',  width:15},
    {name:'apellido_casada', label:'Apellido Casada',  width:15},
    {name:'fecha_nacimiento_format', label:'Fecha de Nacimiento',  width:20},
  ];

  columnsFuncionarioSelect: any =
  [
    {name:'tipo_cargo', label:'Tipo de Cargo',  width:15},
    {name:'cargo', label:'Cargo',  width:30},
    {name:'nro_contrato', label:'Nro de Contrato',  width:20},
    {name:'fecha_ingreso_format', label:'Fecha Ingreso',  width:20},
    {name:'estado', label:'Estado',  width:15},
  ];

  formControl:any=
  {
    'funcionario':  [this.data.data.id,[Validators.required]],
    'categoriaBaja':  ['', [Validators.required]],
    'fechaBaja': [null, Validators.required],
    'nroBaja': [null, [Validators.required , Validators.minLength(1), Validators.maxLength(50)]],
    'comentarios': ['', [ Validators.minLength(2), Validators.maxLength(2000)]]
  };

  constructor
  (
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogBajaInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: RegistrosService,
    public restCrud: CrudService,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroup =this.formBuilder.group(this.formControl);
    this.restCrud.getOptions().subscribe((data:any) => {
      this.dataOptions = data.data;
      this.optionsBaja = this.dataOptions.baja
      if(this.data.data.tipo_cargo!='funcionario'){
        this.optionsBaja = this.dataOptions.baja_ejecutivos
      }
    });
  }


  ngOnInit( )
  {  }

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
        this.restCrud.create('registros_bajas', post).
        subscribe((data:any) => {
          if (data.status === 'error') {
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
