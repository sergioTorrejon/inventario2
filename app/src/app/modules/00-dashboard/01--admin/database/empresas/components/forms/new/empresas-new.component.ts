import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { EmpresasService } from '../../../empresas.service';


@Component({
  selector: 'app-empresas-new',
  templateUrl: './empresas-new.component.html',
  styleUrls: ['./empresas-new.component.css'],
})
export class EmpresasNewComponent implements OnInit  {
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