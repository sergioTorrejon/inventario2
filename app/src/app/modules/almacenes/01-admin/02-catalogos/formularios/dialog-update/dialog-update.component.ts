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
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from 'src/app/services/crud/crud.service';

import { ProvedoresService } from '../../catalogos.service';

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
export class DialogUpdateComponent implements OnInit  {

  //Formularios
  formGroupFuncionario: UntypedFormGroup;

  dataOptions: any = [] ;

  editar = false

  //sort
  sort: string = '';
  order: string = '';
  page = {
    length: 10,
    size: 10,
    index: 0
  };

  columns: any =
  [
    //FORMULARIO
    {name:'nombre_empresa', label:'Codigo',  width:40},
    {name:'tipo_cargo', label:'Tipo de Cargo',  width:10},
    {name:'cargo', label:'Cargo',  width:20},
    {name:'fecha_ingreso', label:'Fecha de ingreso',  width:20},
    {name:'estado', label:'Estado', width:10},
  ];

  formFuncionario:any=
  {
    'codigo':  [this.data.data.codigo, [Validators.required]],
    'categoria':  [this.data.data.categoria, [Validators.required]],
    'marca': [this.data.data.marca, Validators.required],
    'modelo':  [this.data.data.modelo, [Validators.required]],
    'medida':  [this.data.data.medida, [Validators.required]],
    'descripcion':  [this.data.data.descripcion, [Validators.required]],

  };

  columnsSelect: any =
  [
    {name:'codigo', label:'Codigo',  width:10},
    {name:'categoria', label:'Categoria',  width:10},
    {name:'marca', label:'Marca',  width:20},
    {name:'modelo', label:'Modelo',  width:20},
    {name:'medida', label:'Medida',  width:20},
    {name:'descripcion', label:'Descripción',  width:20},
  ];



  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: ProvedoresService,
    public restCrud: CrudService,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroupFuncionario =this.formBuilder.group(this.formFuncionario);
    this.restCrud.getOptions().subscribe((data:any) => {
      this.dataOptions = data.data;
    });
  }


  ngOnInit( )
  {
  }

  onSubmit(post:any) {
    this.restCrud.update('productos',this.data.data.id, post).
    subscribe((data:any) => {
      if (data.success === false) {
        this.openSnackBar(data.message,'','error')
      }
      else{
        this.close(data);
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
