import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-mat-form-simple',
  templateUrl: './form-simple.component.html',
  styleUrls: ['./form-simple.component.css'],
})
export class MatFormSimpleComponent implements OnInit {
  @Input() modelForm: any= [];
  @Output() formOnChangeEvent = new EventEmitter<string>();
  @Output() onClickEvent = new EventEmitter<string>();

  // Variables del Formulario
  formGroup: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    ) {
      this.formGroup = this.formBuilder.group([]);
    }

  ngOnInit() {
  }

  ngOnChanges() {
    this.setForm();
  }

  setForm(){
    this.formGroup =this.formBuilder.group(this.modelForm.formControl);
    this.formOnChange();
  }

  setFormField(){
    console.log('this.$event$event',(this.formGroup).getRawValue())
    //this.onClickEvent.emit($event);
  }

  formOnChange(){
    this.formGroup.valueChanges.subscribe(async data => {
      this.formOnChangeEvent.emit(data);
    })
  }

  onClick($event){
    this.onClickEvent.emit($event);
  }

}