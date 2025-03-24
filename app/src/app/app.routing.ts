import { Routes } from '@angular/router';

import { AuthGuard } from './authentication/guard/auth.guard';
import { Roles } from './authentication/guard/roles';
import { AppBlankComponent } from './shared/layouts/blank/blank.component';
import { FullComponent } from './shared/layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
          path: '',
          redirectTo: '/consultas',
          pathMatch: 'full'
      },


      //ADMINISTRATOR

      {
        path: 'empresas',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/admin/database/empresas/empresas.module').then(m => m.EmpresasModule),
        data: {titulo:'empresa', roles: [Roles.Administrador]}
      },

      {
        path: 'personas',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/admin/database/personas/personas.module').then(m => m.PersonasModule),
        data: { titulo:'personas',roles: [Roles.Administrador]}
      },
      {
        path: 'solicitudes',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/admin/tools/solicitudes/solicitudes.module').then(m => m.SolicitudesModule),
        data: { titulo:'solicitudes',roles: [Roles.Administrador, Roles.OperadorFuncionarios, Roles.AprobadorFuncionarios]}
      },

      {
        path: 'provedores',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/admin/provedores/provedores.module').then(m => m.ProvedoresModule),
        data: { titulo:'registros', roles: [Roles.Administrador, Roles.OperadorFuncionarios, Roles.AprobadorFuncionarios]}
      },

      //ADMINISTRATOR

      {
        path: 'categorias',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/config/categorias/categorias.module').then(m => m.CategoriasModule),
        data: { roles: [Roles.Administrador]}
      },

      //CORE

      {
        path: 'consultas',
        //canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/rms/01-consultas/consultas.module').then(m => m.ConsultasModule)
      },
      {
        path: 'registros',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/rms/02-registros/registros.module').then(m => m.RegistrosModule),
        data: { titulo:'registros', roles: [Roles.Administrador, Roles.OperadorFuncionarios, Roles.AprobadorFuncionarios]}
      },
      {
        path: 'inhabilitaciones',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/rms/inhabilitaciones/inhabilitaciones.module').then(m => m.InhabilitacionesModule),
        data: { roles: [Roles.Administrador, Roles.OperadorFuncionarios, Roles.AprobadorFuncionarios]}
      },
      {
        path: 'suspenciones',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/rms/suspenciones/suspenciones.module').then(m => m.SuspencionesModule),
        data: { titulo:'suspenciones',roles: [Roles.Administrador, Roles.OperadorFuncionarios, Roles.AprobadorFuncionarios]}
      },

    ]
  },

  {
    path: '',
    component: AppBlankComponent,
      children: [
        {
            path: 'authentication',
            loadChildren:
                () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
        }
      ]
  },
  {
      path: '**',
      redirectTo: 'authentication/404'
  }
];
