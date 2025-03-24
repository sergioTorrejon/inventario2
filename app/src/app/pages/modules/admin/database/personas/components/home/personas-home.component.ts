import {
  Component,
  OnInit,
} from '@angular/core';

import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-personas-home',
  templateUrl: './personas-home.component.html',
})
export class PersonasHomeComponent implements OnInit  {
  constructor( public service:PersonasService )  {   }
  ngOnInit() { }

}
