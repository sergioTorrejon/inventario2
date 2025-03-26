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
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  MessageBoxComponent,
} from 'src/app/components/dialogs/message-box/message-box.component';
import {
  PersonasService,
} from 'src/app/pages/modules/admin/database/personas/personas.service';
import { CrudService } from 'src/app/services/crud/crud.service';

import { RegistrosService } from '../../registros.service';

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
//global
  dateToday= new Date()
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  currentDay = new Date().getDate();
  mayorEdad = new Date(this.currentYear - 18, this.currentMonth, this.currentDay);


  //Formularios
  formGroupFuncionario: UntypedFormGroup;
  formGroupSearch: UntypedFormGroup;
  formGroupPersona: UntypedFormGroup;

  dataOptions: any = [] ;

  representacionLegal = false;
  showApellidoCasada = false;
  nuevo = false;
  observaciones = false;
  seleccionado = false;
  rowSelect:any = [];

  listPaises:any = [];
  listEstadosDepartamentos:any = [];
  listCiudadesMunicipios:any = [];

  isFuncionario = false

  isEjecutivo = false
  isDirectivo = false

  estadoDepartamento = 1


  dataPersonas: any =[];
  count = 0;

  dataSelect: any=[];

  //sort
  sort: string = '';
  order: string = '';
  page = {
    length: 10,
    size: 10,
    index: 0
  };

  formSearch:any=
  {
    'nroIdentificacion':  [''],
    'nombreCompleto':  ['']
  };

  formPersona:any=
  {
    'nroIdentificacion':  ['', [Validators.required]],
    'pais': ['', [Validators.required]],
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

  formFuncionario:any=
  {
    personaNatural:  [''],
    tipoCargo:  [1, [Validators.required]],
    tipoDirectivo:  [null],
    tipoFuncionario:  [null],
    tipoContrato:  [null],
    cargo:  ['', [Validators.required]],
    fechaIngreso: [null, Validators.required],
    estadoDepartamento:  [1, [Validators.required]],
    ciudadMunicipio:  [1, [Validators.required]],
    email: [null],
    telefono: [null],
    nroContrato:  ['', [Validators.required]],
    tipoApoderado:  [null],
    codColegiatura:  [null],
    nroRepresentacionLegal:  [null],
    fechaInicioRepresentacionLegal:  [null],
    fechaFinRepresentacionLegal:  [null],

  };

  headersTable: any =
  [
    {name:'nro_identificacion', label:'Nro de Identificacion',  width:20},
    {name:'nombre_completo', label:'Nombres y Apellidos', width:60},
  ];

  columns: any =
  [
    {name:'nombre_empresa', label:'Empresa',  width:40},
    {name:'tipo_cargo', label:'Tipo de Cargo',  width:10},
    {name:'cargo', label:'Cargo',  width:20},
    {name:'fecha_ingreso_format', label:'Fecha de ingreso',  width:20},
    {name:'estado', label:'Estado', width:10},
  ];

  columnsSelect: any =
  [
    {name:'nro_identificacion', label:'Nro. Identificación',  width:20},
    {name:'nombres', label:'Nombres',  width:15},
    {name:'primer_apellido', label:'Primer Apellido',  width:15},
    {name:'segundo_apellido', label:'Segundo Apellido',  width:15},
    {name:'apellido_casada', label:'Apellido Casada',  width:15},
    {name:'fecha_nacimiento_format', label:'Fecha de Nacimiento',  width:20},
  ];

  constructor
  (
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: RegistrosService,
    public restPersonas: PersonasService,
    public restCrud: CrudService,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroupFuncionario =this.formBuilder.group(this.formFuncionario);
    this.formGroupSearch =this.formBuilder.group([]);
    this.formGroupPersona =this.formBuilder.group(this.formPersona);
    this.dataOptions = this.data.model.dataOptions;
  }

  ngOnInit( )
  {
    this.setFormSearch()
    this.formOnchange();
  }

  formOnchange(){
    this.formGroupSearch.valueChanges.subscribe(async data => {
      this.dataSearchTableUpdate(this.page);
    })

    this.formGroupFuncionario.controls['tipoCargo'].valueChanges.subscribe(async data => {
      console.log('tipoCargo',data);
      this.isFuncionario=false
      this.isEjecutivo=false
      this.isDirectivo=false
      if(data==10){
        this.isFuncionario=true
      }
      if(data==8){
        this.isEjecutivo=true
      }
      if(data==7){
        this.isDirectivo=true
      }
    })

    this.formGroupFuncionario.controls['estadoDepartamento'].valueChanges.subscribe(async data => {
    })
  }

  //SEARCH FORM
  setFormSearch(){
    this.seleccionado=false;
    this.rowSelect = []
    this.formGroupSearch =this.formBuilder.group(this.formSearch);
    this.formOnchange();
    this.dataSearchTableUpdate(this.page);
  }

  dataSearchTableUpdate(event: any){
    this.page.size = event.pageSize !== undefined? event.pageSize: 10;
    this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
    const dto = (this.formGroupSearch).getRawValue()
    if(dto.nombreCompleto.length>3 || dto.nroIdentificacion.length>3){
      this.restCrud.getPersonas(dto,this.page.index+1, this.page.size,this.sort, this.order)
      .subscribe((data:any) => {
        const result = data.data
        this.dataPersonas = result.data;
        this.count = result.count;
      });
    }
    else{
      this.dataPersonas = [];
      this.count = 0;
    }

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
        descripcion: 'Se realizará el registro',
      },
    });
    dialogMessage.afterClosed().subscribe((result1) => {
      if (result1 === 'confirm') {
        this.restCrud.create('registros_funcionarios', post).
        subscribe((data:any) => {
          if (data.success === false) {
            this.openSnackBar(data.message,'','error')
          }
          else{
            this.close(data);
            this.dataSearchTableUpdate(this.page)
          }
        });
      }
    });

  }

  onSubmitPersonas(post:any) {
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
        subscribe((result:any) => {
          if (result.success === true) {
            console.log(result.data,'RESULTTTT')
            this.openSnackBar(result.message,'','ok')
            this.nuevo = false
            this.observaciones = true
            this.select(result.data)
          }
          if (result.success === false) {
            this.openSnackBar(result.message,'','error')
          }
        });
      }
    });

  }

  select(row:any){
    console.log(row)
    this.seleccionado = true
    this.observaciones = false
    this.rowSelect= row
    this.dataSelesctTableUpdate(this.page)
    this.formGroupFuncionario.controls.personaNatural.setValue(this.rowSelect.id.toString())
    this.dataPersonas = []
  }

  dataSelesctTableUpdate(event: any){
    this.page.size = event.pageSize !== undefined? event.pageSize: 10;
    this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
    console.log('****this.rowSelect',this.rowSelect)
    this.rest.getConsultaFuncionario(this.rowSelect.nro_identificacion,this.page.index+1, this.page.size,this.sort, this.order)
    .subscribe((data:any) => {
      const result = data.data
      this.dataSelect = result.data;
      if(this.dataSelect.length==0){
        this.observaciones=true
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
