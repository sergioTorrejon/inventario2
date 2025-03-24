import {
  Component,
  OnInit,
} from '@angular/core';

import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-personas-toolbar',
  templateUrl: './personas-toolbar.component.html',
})
export class PersonasToolbarComponent implements OnInit  {
  constructor( public service:PersonasService )  {   }
  ngOnInit() { }

}
