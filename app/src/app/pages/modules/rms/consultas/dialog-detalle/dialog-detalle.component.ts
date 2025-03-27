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
import { RegistrosService } from '../../registros/registros.service';


@Component({
  selector: 'app-dialog-detalle',
  templateUrl: './dialog-detalle.component.html',
  styleUrls: ['./dialog-detalle.component.css'],
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
export class DialogDetalleComponent implements OnInit  {

  //Formularios
  formGroupFuncionario: UntypedFormGroup;

  dataOptions: any = [] ;

  showHechoPosterior=false
  dataHechosPosteriores: any = [];

  dataSelect:any = [];
  count:number=0;

  cargos={
    data:[],
    count:0
  }

  bajaSelect:any=[]
  idBajaSelect=-1

  //sort
  sort: string = '';
  order: string = '';
  page = {
    size: 10,
    index: 0
  };

  formFuncionario:any=
  {
    'personaNatural':  [''],
    'tipoCargo':  [this.data.data.id_tipo_cargo, [Validators.required]],
    'cargo':  [this.data.data.cargo, [Validators.required]],
    'fechaIngreso': [this.data.data.fecha_ingreso, Validators.required],
    'departamento':  [this.data.data.departamento, [Validators.required]],
    'municipio':  [this.data.data.municipio, [Validators.required]],
    'nroContrato':  [this.data.data.nro_contrato, [Validators.required]],

  };

  columnsSelect: any =
  [
    {name:'nro_identificacion', label:'Nro. Identificación',  width:20},
    {name:'nombres', label:'Nombres',  width:20},
    {name:'apellidos', label:'Apellidos',  width:20},
    {name:'apellido_casada', label:'Apellido Casada',  width:20},
    {name:'fecha_nacimiento_format', label:'Fecha de Nacimiento',  width:20},
  ];

  columnsBajaSelect: any =
  [
    {name:'categoria_baja', label:'CategoriaBaja',  width:60},
    {name:'fecha_baja_format', label:'Fecha Baja',  width:10},
    {name:'nro_baja', label:'Nro de Baja',  width:10},
    {name:'comentarios', label:'Comentarios',  width:20},
    //{name:'estado', label:'Estado',  width:15},
  ];

  columns: any =
  [
    //FORMULARIO
    {name:'nombre_empresa', label:'Empresa',  width:30},
    {name:'tipo_cargo', label:'Tipo de Cargo',  width:10},
    {name:'cargo', label:'Cargo',  width:20},
    {name:'fecha_ingreso_format', label:'Fecha de ingreso',  width:20},
    {name:'estado', label:'Estado', width:10},
  ];

  columnsHechosPosteriores: any =
  [
    //FORMULARIO
    {name:'causal', label:'Causal',  width:40},
    {name:'fecha_registro_format', label:'Fecha',  width:10},
    {name:'descripcion', label:'Descripción',  width:20},
    {name:'estado', label:'Estado',  width:10},
    {name:'observaciones', label:'Observaciones', width:20},
  ];


  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public restCrud: CrudService,
    public restFuncionario: RegistrosService,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroupFuncionario =this.formBuilder.group(this.formFuncionario);
  }


  ngOnInit( )
  {
    this.dataTableUpdate(this.page);
  }

  dataTableUpdate(event: any){

    this.page.size = event.pageSize !== undefined? event.pageSize: 10;
    this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
    this.restFuncionario.getConsultaFuncionario(this.data.data.nro_identificacion,this.page.index+1, this.page.size,this.sort, this.order)
    .subscribe((data:any) => {
      console.log(data)
      const result = data.data
      this.cargos.data = result.data;
      this.cargos.count = result.count
    });
  }

  rowSelect(rowSelect: any) {
    this.idBajaSelect=rowSelect.id_registro_baja
    this.restCrud.getById('registros_bajas',this.idBajaSelect).
    subscribe((data:any) => {
      this.bajaSelect= data.data.data
    });
    this.restCrud.getById('registros_hechos_posteriores/consulta_hechos',this.idBajaSelect)
    .subscribe((data:any) => {
      this.dataHechosPosteriores =data.data.data
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
