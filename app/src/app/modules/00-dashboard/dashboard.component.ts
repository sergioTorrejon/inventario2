import {
  Component,
  OnInit,
} from '@angular/core';

import {
  AuthenticationService,
} from 'src/app/authentication/services/authentication.service';
import { AuthorizationService } from 'src/app/authentication/services/authorization.service';
import { CrudService } from 'src/app/services/crud/crud.service';
import { DashboardService } from './dashboard.service';
import { MODEL } from './model/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

   
  // MODEL
  model=MODEL

  constructor(
    public rest: DashboardService,
    public restCrud: CrudService,
    public authorizationService: AuthorizationService,
    public authenticationService: AuthenticationService,
    ) {
    }

  ngOnInit() {
  }

 
}

