import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  AuthorizationService,
} from 'src/app/authentication/services/authorization.service';
import { CrudService } from 'src/app/services/crud/crud.service';

import {
  DialogInsertComponent,
} from './components/forms/dialog-insert/dialog-insert.component';
import {
  DialogUpdateComponent,
} from './components/forms/dialog-update/dialog-update.component';
import { PersonasService } from './personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {

  constructor(
    public service: PersonasService,
    private dialog: MatDialog,
    public restCrud: CrudService,
    public authorizationService: AuthorizationService,
    ) {
      this.service.setService()
    }

    ngOnInit() {
      this.service.confff();
    }

    insertRow(){
      let dialogRef = this.dialog.open(DialogInsertComponent,this.restCrud.Dialog([]));
      dialogRef.afterClosed().subscribe((result:any) => {
        this.restCrud.Open(result)
        this.service.dataTableUpdate();
      });
    }

    updateRow(rowSelect: any) {
      let dialogRef = this.dialog.open(DialogUpdateComponent, this.restCrud.Dialog(rowSelect));
      dialogRef.afterClosed().subscribe((result) => {
        this.restCrud.Open(result)
        this.service.dataTableUpdate();
      });
    }

    deleteRow(rowSelect: any) {
      this.restCrud.deleteRow(this.service.nameModel,rowSelect)
      this.service.dataTableUpdate();
    }

}

