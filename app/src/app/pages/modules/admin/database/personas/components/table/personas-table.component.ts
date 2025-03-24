import {
  Component,
  OnInit,
} from '@angular/core';

import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-personas-table',
  templateUrl: './personas-table.component.html',
})
export class PersonasTableComponent implements OnInit  {
  constructor( public service:PersonasService )  {   }
  ngOnInit() { }

}
