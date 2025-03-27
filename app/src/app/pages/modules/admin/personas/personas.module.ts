import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from 'src/app/app-material-module';
import { ComponentsModule } from 'src/app/components/components.module';

import {
  DialogInsertComponent,
} from './components/forms/dialog-insert/dialog-insert.component';
import {
  DialogUpdateComponent,
} from './components/forms/dialog-update/dialog-update.component';
import {
  PersonasNewComponent,
} from './components/forms/new/personas-new.component';
import {
  PersonasSearchComponent,
} from './components/forms/search/personas-search.component';
import {
  PersonasHomeComponent,
} from './components/home/personas-home.component';
import {
  PersonasTableComponent,
} from './components/table/personas-table.component';
import {
  PersonasToolbarComponent,
} from './components/toolbar/personas-toolbar.component';
import { PersonasComponent } from './personas.component';

@NgModule({
    declarations: [
      PersonasComponent,
      PersonasHomeComponent,
      PersonasToolbarComponent,
      PersonasTableComponent,
      PersonasSearchComponent,
      PersonasNewComponent,
      DialogInsertComponent,
      DialogUpdateComponent
    ],
    exports: [],
    bootstrap: [PersonasComponent],
    imports: [
      CommonModule,
      AppMaterialModule,
      ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: PersonasComponent
            },
        ])
    ]
})
export class PersonasModule { }
