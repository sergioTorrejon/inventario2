import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material-module';
import { ComponentsModule } from 'src/app/components/components.module';

import { EmpresasComponent } from './empresas.component';
import { EmpresasSearchComponent } from './components/forms/search/empresas-search.component';
import { EmpresasEditComponent } from './components/forms/edit/empresas-edit.component';
import { EmpresasNewComponent } from './components/forms/new/empresas-new.component';
import { EmpresasTableComponent } from './components/table/empresas-table.component';
import { EmpresasToolbarComponent } from './components/toolbar/empresas-toolbar.component';
import { EmpresasHomeComponent } from './components/home/empresas-home.component';

@NgModule({
    declarations: [
        EmpresasComponent,
        EmpresasToolbarComponent,
        EmpresasHomeComponent,
        EmpresasTableComponent,
        EmpresasSearchComponent,
        EmpresasNewComponent,
        EmpresasEditComponent 
    ],
    exports: [],
    bootstrap: [EmpresasComponent],
    imports: [
        CommonModule,
        AppMaterialModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: EmpresasComponent
            },
        ])
    ]
})
export class EmpresasModule { }
