import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppMaterialModule } from 'src/app/app-material-module';
import { ComponentsModule } from 'src/app/components/components.module';

import { DialogInsertComponent } from './dialog-insert/dialog-insert.component';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import { CategoriasComponent } from './categorias.component';


@NgModule({
    declarations: [CategoriasComponent, DialogInsertComponent, DialogUpdateComponent,
    ],
    exports: [],
    bootstrap: [CategoriasComponent],
    imports: [
        ReactiveFormsModule,
        PdfViewerModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        AppMaterialModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: CategoriasComponent
            },
        ])
    ]
})
export class CategoriasModule { }
