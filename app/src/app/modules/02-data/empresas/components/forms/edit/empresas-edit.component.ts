import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { EmpresasService } from '../../../empresas.service';


@Component({
  selector: 'app-empresas-edit',
  templateUrl: './empresas-edit.component.html',
  styleUrls: ['./empresas-edit.component.css'],
})
export class EmpresasEditComponent implements OnInit  {
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
    this.formGroup =this.formBuilder.group(this.service.formControlInsert);
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


  onSubmit(post:any) {

  }


}