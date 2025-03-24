import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.css'],
})
export class TableBasicComponent implements OnInit  {
  @Input() model: any= [];
  @Input() data: any= [];
  @Output() onSelectEvent = new EventEmitter<string>();
  @Output() onChangeEvent = new EventEmitter<any>();

  //sort
  sort: string = 'id';
  order: string = 'desc';
  // page
  page = {
    size: 10,
    index: 0
  };

  constructor(
    ) {
    }

  ngOnInit() {
  }

  selectRow(button:string,rowSelect:any){
    console.log(button)
    this.onSelectEvent.emit(rowSelect)
  }

  sortData(event:any){
    this.sort = event.active;
    this.order = event.direction;
    if (this.order == ""){
      this.sort = 'id';
    }
    this.OnChange()
  }

  pagChange(event:any){
    this.page.size = event.pageSize !== undefined? event.pageSize: 10;
    this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
    this.OnChange()
  }

  OnChange(){
    const pag = {page:this.page,sort:this.sort,order:this.order}

    this.onChangeEvent.emit(pag)
  }

}