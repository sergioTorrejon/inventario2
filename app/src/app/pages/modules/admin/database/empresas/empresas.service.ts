import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config/config.service';
import { CrudService } from 'src/app/services/crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class  EmpresasService {
  nameModel:string='empresa'

  conf:any=[];
  data:any=[];
  count:number=0;

  sort: string = 'id';
  order: string = '';

  //table
  page={
    size: 10,
    index: 0,
  };

  formControlInsert={
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
  }

  constructor (
    private configService: ConfigService,
    private restCrud:  CrudService,
  ) {
    }

    menuSelect(select:string){
      this.conf.optionSelected=select;
    }

    setService(){
      this.conf=[];
      this.data=[];
      this.count=0;
    
      this.sort= 'id';
      this.order = '';
    
      //table
      this.page={
        size: 10,
        index: 0,
      };
    }

    dataTableUpdate(){
      this.restCrud.getData(this.nameModel,'',this.page.index+1, this.page.size,this.sort, this.order)
      .subscribe((data:any) => {
        const result = data.data
        this.data = result.data;
        this.count = result.count;
      });
    }

    pagination(event: any){
      this.page.size = event.pageSize !== undefined? event.pageSize: 10;
      this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
      this.dataTableUpdate();
    }

    sortData(event:any){
      this.sort = event.active;
      this.order = event.direction;
      if (this.order == ''){
        this.sort = 'id';
      }
      this.page.size = 10
      this.page.index = 0
      this.dataTableUpdate();
    }

    confff(){
      this.restCrud.getConfig(this.nameModel).subscribe(
        response=>{
          this.conf=response.data
          this.configService.conf= this.conf.config
        }
      )
      this.dataTableUpdate();
    }

}
