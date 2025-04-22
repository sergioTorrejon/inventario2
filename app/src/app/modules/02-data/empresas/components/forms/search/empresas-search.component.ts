import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { EmpresasService } from '../../../empresas.service';


@Component({
  selector: 'app-empresas-search',
  templateUrl: './empresas-search.component.html',
  //styleUrls: ['./empresas-search.component.css'],
})
export class EmpresasSearchComponent implements OnInit  {
  formGroup: UntypedFormGroup;

    constructor(
      private formBuilder: UntypedFormBuilder,
      public service:EmpresasService,
      ) {
      }
      
    ngOnInit() {
      this.setForm()
    }

  setForm(){
    this.formGroup =this.formBuilder.group(this.service.conf.formControl);
    this.formOnChange();
  }

  formOnChange(){
    this.formGroup.valueChanges.subscribe(async data => {
      this.formOnChange();
    })
  }
  
  setFormField(field:string){
    this.formGroup.controls[field].setValue('');
    this.formOnChange();
  }




}