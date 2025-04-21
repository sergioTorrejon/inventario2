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
  selector: 'app-personas-new',
  templateUrl: './personas-new.component.html',
  styleUrls: ['./personas-new.component.css'],
})
export class PersonasNewComponent implements OnInit  {
  formGroup: UntypedFormGroup;

    constructor(
      private formBuilder: UntypedFormBuilder,
      public service: PersonasService,
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
