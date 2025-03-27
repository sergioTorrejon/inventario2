import {
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';

import { PersonasService } from '../../../personas.service';

@Component({
  selector: 'app-personas-search',
  templateUrl: './personas-search.component.html',
  //styleUrls: ['./empresas-search.component.css'],
})
export class PersonasSearchComponent implements OnInit  {
  formGroup: UntypedFormGroup;

    constructor(
      private formBuilder: UntypedFormBuilder,
      public service:PersonasService,
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
