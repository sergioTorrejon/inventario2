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
import { SolicitudesService } from 'src/app/pages/modules/admin/tools/solicitudes/solicitudes.service';

import { CrudService } from 'src/app/services/crud/crud.service';

import { RegistrosService } from '../../registros.service';

@Component({
  selector: 'app-dialog-baja-update',
  templateUrl: './dialog-baja-update.component.html',
  styleUrls: ['./dialog-baja-update.component.css'],
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
export class DialogBajaUpdateComponent implements OnInit  {
 //prueba

  //Formularios
  formGroup: UntypedFormGroup;
  formGroupNotificacion: UntypedFormGroup;
  formGrouEditHechosPosteriores: UntypedFormGroup;
  formGroupSolicitudes: UntypedFormGroup;

  dataBaja: any =[];

  dataRow: any = [];
  dataSolicitudes: any = [];
  dataHechosPosteriores: any = [];

  nuevoHechoPosterior=false
  editHechoPosterior=false

  viewSolicitudes= false

  dataOptions: any = [] ;

  optionsHEchosPosteriores: any = [];

  rowEdit:number=0;

  updateRegistroBaja = false;

  columnsSelect: any =
  [
    {name:'nro_identificacion', label:'Nro. Identificación',  width:10},
    {name:'nombre_completo', label:'Nombres',  width:30},
    {name:'tipo_cargo', label:'Tipo de Cargo',  width:15},
    {name:'cargo', label:'Cargo',  width:25},
    {name:'fecha_ingreso_format', label:'Fecha de ingreso',  width:10},
    {name:'estado', label:'Estado', width:10},
  ];

  columnsBajaSelect: any =
  [
    {name:'categoria_baja', label:'CategoriaBaja',  width:60},
    {name:'fecha_baja_format', label:'Fecha Baja',  width:10},
    {name:'nro_baja', label:'Nro de Baja',  width:10},
    {name:'comentarios', label:'Comentarios',  width:20},
    //{name:'estado', label:'Estado',  width:15},
  ];

  formControl:any=
  {
    'funcionario':  [,[Validators.required]],
    'categoriaBaja':  [this.data.baja.id_categoria_baja, [Validators.required]],
    'fechaBaja': [this.data.baja.fecha_baja, Validators.required],
    'nroBaja': [this.data.baja.nro_baja, [Validators.required , Validators.minLength(4), Validators.maxLength(4)]],
    'comentarios': [this.data.baja.comentarios, [ Validators.minLength(2), Validators.maxLength(2000)]],
    'hechosPosteriores': ['']
  };

  formControlNotificaciones:any=
  {
    'registroBaja': [this.data.baja.id],
    'causal':  [null, [Validators.required]],
    'fecha': [null, Validators.required],
    'descripcion':  [null, [Validators.required , Validators.minLength(2), Validators.maxLength(300)]],
    'estado': ['enProceso'],
    'observaciones':  [''],
  };

  formControlEditHechosPosteriores:any=
  {
    'estado': [null, [Validators.required]],
    'observaciones':  [null, [Validators.required , Validators.minLength(2), Validators.maxLength(300)]],
  };


  formControlSolicitud: any=
  {
    'registroBaja': [this.data.baja.id],
    'TipoSolicitud':  [null, [Validators.required]],
    'Descripcion':  [null, [Validators.required , Validators.minLength(2), Validators.maxLength(300)]],
  };


  tipoSolicitud = [
    {value:"anulacion",label:'Anulación de la baja'},
    {value:"rectificacion",label:'Rectificación de la baja'},
    {value:"recodificacion",label:'Recodificación'}
  ]

  solicitudesCount = 0;
  //sort
  //sort: string = '';
  //order: string = '';
  pageSolicitudes = {
    length: 10,
    size: 10,
    index: 0,
    sort: '',
    order: ''
  };

  headersSolicitudes: any =
  [
    {name:'tipo_solicitud', label:'Tipo Solicitud',  width:10},
    {name:'descripcion', label:'Descripción',  width:15},
    {name:'usuario_solicitud', label:'Solicitado por',  width:10},
    {name:'fecha_solicitud_format', label:'Fecha solicitud',  width:10},
    {name:'respuesta', label:'Respuesta', width:15},
    {name:'usuario_aprobacion', label:'Atentido por',  width:10},
    {name:'fecha_aprobacion_format', label:'Fecha respuesta',  width:10},
    {name:'estado', label:'Estado', width:10},
  ];

  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogBajaUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: RegistrosService,
    public restSolicitudes: SolicitudesService,
    public restCrud: CrudService,
    private _snackBar: MatSnackBar,
  )
  {
    this.formGroup =this.formBuilder.group(this.formControl);
    this.formGroupNotificacion =this.formBuilder.group(this.formControlNotificaciones);
    this.formGroupSolicitudes =this.formBuilder.group(this.formControlSolicitud);
    this.formGrouEditHechosPosteriores =this.formBuilder.group(this.formControlEditHechosPosteriores);
    this.dataBaja = this.data.baja;

    this.restCrud.getOptions().subscribe((data:any) => {
      this.dataOptions = data.data;
      this.optionsHEchosPosteriores = this.dataOptions.hecho_posterior
      if(this.data.data.tipo_cargo!='funcionario'){
        this.optionsHEchosPosteriores = this.dataOptions.hecho_posterior_ejecutivo
      }
    });
  }


  ngOnInit( )
  {
    this.formGroup.controls['funcionario'].setValue(this.data.data.id.toString());

    //this.formGroup.controls['funcionario'].setValue(this.data.data.id.toString());
    console.log(this.data,'/*/**/*/*')
    this.dataSolicitudesTableUpdate();
    this.dataSelesctTableUpdate();
    this.formOnchange();

  }

  formOnchange(){
    this.formGroupNotificacion =this.formBuilder.group(this.formControlNotificaciones);
    this.formGroup =this.formBuilder.group(this.formControl);
  }

  deleteRow(rowSelect: any) {
    var i = this.dataHechosPosteriores.indexOf( rowSelect );
    this.dataHechosPosteriores.splice( i, 1 );
  }

  EditHechosPosteriores(rowSelect: any) {
    var i = this.dataHechosPosteriores.indexOf( rowSelect );
    this.rowEdit= rowSelect.id
    this.dataSelesctTableUpdate();
  }

  ConfirmHechosPosteriores(rowSelect: any) {
    const dto = (this.formGrouEditHechosPosteriores).getRawValue();
    console.log(dto)
    this.rest.confirmHechosPosteriores(rowSelect.id, dto).
    subscribe((data:any) => {
      this.rowEdit= 0
      this.dataSelesctTableUpdate();
    });
  }

  saveNotificaciones(post:any) {
    this.restCrud.create('registros_hechos_posteriores', post).
    subscribe((data:any) => {
      this.dataSelesctTableUpdate();
      this.formGroupNotificacion =this.formBuilder.group(this.formControlNotificaciones);
    });
  }

  dataSelesctTableUpdate(){
    this.restCrud.getById('registros_hechos_posteriores/consulta_hechos',this.dataBaja.id)
    .subscribe((data:any) => {
      this.dataHechosPosteriores =data.data.data
    });
  }

  onSubmit(post:any) {
    this.restCrud.update('registros_bajas',this.data.baja.id,post ).
    subscribe((data:any) => {
/*       if (data.status === 'error') {
        this.openSnackBar(data.message,'','error')
      }
      else{
        this.close(data);
      } */
    });
  }

  saveSolicitud(post:any) {
    this.restCrud.create('solicitudes', post).
    subscribe((data:any) => {
      this.dataSolicitudesTableUpdate();
      this.formGroupSolicitudes =this.formBuilder.group(this.formControlSolicitud);
    });
  }

  dataSolicitudesTableUpdate(){

    this.restSolicitudes.getData('solicitudes',this.data.baja, this.pageSolicitudes.index+1, this.pageSolicitudes.size,this.pageSolicitudes.sort, this.pageSolicitudes.order)
    .subscribe((data:any) => {
      const result = data.data
      this.dataSolicitudes = result.data;
    });
  }

  CancelarSolicitud(data:any) {
    //this.dialogRef.close(data);

    console.log('CancelarSolicitud',data);


    //data.RegistroBaja = this.data.data.id_registro_baja.toString();

    let dto: any = {
      TipoSolicitud: data.tiposolicitud,
      Descripcion: data.descripcion,
      Estado: 'ANULADO',
      RegistroBaja: this.data.data.id_registro_baja.toString(),
      id: data.id.toString()
    }
    console.log('PUT',dto)

    this.restSolicitudes.updated(dto).
    subscribe((d:any) => {
      if (d.status === 'error') {
        this.openSnackBar(d.message,'','error')
      }
      else{
        this.close(d);
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
