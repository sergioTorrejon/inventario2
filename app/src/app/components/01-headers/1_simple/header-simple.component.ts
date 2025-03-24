import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-mat-header-simple',
  templateUrl: './header-simple.component.html',
  styleUrls: ['./header-simple.component.css'],
})
export class MatHeaderSimpleComponent implements OnInit  {
  selection!:any;
  constructor( public service:ConfigService )  {   }

  ngOnInit() { 

  }

}