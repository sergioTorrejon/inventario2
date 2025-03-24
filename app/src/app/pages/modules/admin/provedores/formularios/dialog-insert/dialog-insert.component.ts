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

import { ProvedoresService } from '../../provedores.service';

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

  formPersona:any=
  {
    'nroIdentificacion':  ['', [Validators.required]],
    'pais': ['', [Validators.required]],
    'nombres':  ['', [Validators.required]],
    'primerApellido':  ['', [Validators.required]],
    'segundoApellido': [''],
    'tipoIdentificacion': ['ci', [Validators.required]],
    'fechaNacimiento': [null, Validators.required],
    'email': [''],
    'telefono': [null],
    'direccion':  [null],
  };


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
    public rest: ProvedoresService,
    public restPersonas: PersonasService,
    public restCrud: CrudService,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroupPersona =this.formBuilder.group(this.formPersona);
    this.dataOptions = this.data.model.dataOptions;
  }

  ngOnInit( )
  {
    this.restCrud.getOptionsPaises().subscribe((data:any) => {
      this.listPaises = data.data.paises;
    });

    this.restCrud.getOptionsestadosDepartamentos().subscribe((data:any) => {
      this.listEstadosDepartamentos = data.data.estadosDepartamentos;
    });

    this.restCrud.getOptionsCiudadesMunicipios(this.estadoDepartamento).subscribe((data:any) => {
      this.listCiudadesMunicipios = data.data.ciudadesMunicipios;
    });

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
      this.restCrud.getOptionsCiudadesMunicipios(data).subscribe((data:any) => {
        this.listCiudadesMunicipios = data.data.ciudadesMunicipios;
      });
    })
  }

  //SEARCH FORM
  setFormSearch(){
    this.seleccionado=false;
    this.rowSelect = []
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
          }
          if (result.success === false) {
            this.openSnackBar(result.message,'','error')
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
