import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../empresas.service';
interface Skill {
  name: string;
  selected: boolean;
  disabled: boolean;
  subskills?: Skill[];
}

@Component({
  selector: 'app-empresas-table',
  templateUrl: './empresas-table.component.html',
})
export class EmpresasTableComponent implements OnInit  {
  skill: Skill = {
    name: 'All Skills',
    selected: false,
    disabled: false,
    subskills: [
      { name: 'HTML', selected: false, disabled: false },
      { name: 'CSS', selected: false, disabled: false },
      { name: 'JavaScript', selected: false, disabled: false }
    ]
};
  constructor( public service:EmpresasService )  {   }
  ngOnInit() { }

}