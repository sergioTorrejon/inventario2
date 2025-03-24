import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-mat-card-header',
  templateUrl: './mat-card-header.component.html',
  styleUrls: ['./mat-card-header.component.css'],
})
export class MatCardHeaderComponent implements OnInit  {
  @Input() model: any= [];
  @Output() headerButtonEvent = new EventEmitter<string>();

  constructor( )  {   }

  ngOnInit() { 
  }
  onclick($event){
    this.headerButtonEvent.emit($event)
  }

}