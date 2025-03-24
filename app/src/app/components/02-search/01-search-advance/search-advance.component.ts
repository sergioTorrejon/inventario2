import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-advance',
  templateUrl: './search-advance.component.html',
  styleUrls: ['./search-advance.component.css'],
})
export class SearchAdvanceComponent implements OnInit  {
  @Input() model: any= [];
  @Output() formOnChangeEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>();

  // Variables del Formulario
  formGroup: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    ) {
      this.formGroup =this.formBuilder.group([]);
    }

  ngOnInit() {
      this.setForm();
  }

  setForm(){
    this.formGroup =this.formBuilder.group(this.model.formControl);
    this.formOnChange();
    this.search()
  }

  setFormField(field:string){
    this.formGroup.controls[field].setValue('');
    this.search()
  }

  formOnChange(){
    this.formGroup.valueChanges.subscribe(async data => {
      this.formOnChangeEvent.emit(data);
    })
  }

  search() {
    const data = this.formGroup.getRawValue()
    this.searchEvent.emit(data);
  }

}