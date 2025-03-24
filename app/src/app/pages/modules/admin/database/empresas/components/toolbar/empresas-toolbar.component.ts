import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../empresas.service';

@Component({
  selector: 'app-empresas-toolbar',
  templateUrl: './empresas-toolbar.component.html',
  //styleUrls: ['../../empresas.component.css'],
})
export class EmpresasToolbarComponent implements OnInit  {
  constructor( public service:EmpresasService )  {   }
  ngOnInit() { }

}