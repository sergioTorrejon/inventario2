import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AuthorizationService,
} from 'src/app/authentication/services/authorization.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { EmpresasService } from './empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  // Variables del Formulario
  constructor(
    public authorizationService: AuthorizationService,
    public service: EmpresasService,
    private configService: ConfigService,
    ) {
      this.service.setService()
    }

    ngOnInit(){
      this.service.confff();
    }

}

