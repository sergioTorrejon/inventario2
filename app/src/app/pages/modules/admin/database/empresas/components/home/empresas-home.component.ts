import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../empresas.service';

@Component({
  selector: 'app-empresas-home',
  templateUrl: './empresas-home.component.html',
  styleUrls: ['./empresas-home.component.css'],
})
export class EmpresasHomeComponent implements OnInit  {
  constructor( public service:EmpresasService )  {   }
  ngOnInit() { }

}