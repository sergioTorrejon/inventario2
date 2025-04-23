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
} from 'src/app/components/message-box/message-box.component';
import { CrudService } from 'src/app/services/crud/crud.service';

import { tipoCategoriaProducto, marcasProducto, medidasProducto } from '../../model/productos.model';
import { ProductosService } from '../../productos.service';

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
  
  dataOptions: any = [] ;

  tipoCategoriaProducto= tipoCategoriaProducto
  marcasProducto = marcasProducto
  medidasProducto = medidasProducto

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

  form:any=
  {
    'codigo':  ['', [Validators.required]],
    'categoria': ['', [Validators.required]],
    'marca':  ['', [Validators.required]],
    'modelo':  ['', [Validators.required]],
    'medida': [''],
    'descripcion': ['ci', [Validators.required]],
  };


  constructor
  (
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ProductosService,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroup =this.formBuilder.group(this.form);
    this.dataOptions = this.data.model.dataOptions;
  }

  ngOnInit( )
  {}

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
        this.service.create('productos', post).
        subscribe((result:any) => {
          if (result.success === true) {
            this.openSnackBar(result.message,'','ok')
            this.dialogRef.close(result);
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
