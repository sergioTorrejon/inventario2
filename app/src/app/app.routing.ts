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


      //ALMACENES

      
      //CONSULTAS
      {
        path: 'consultas',
        //canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/rms/consultas/consultas.module').then(m => m.ConsultasModule)
      },
      
      
      //PRODUCTOS
      {
        path: 'productos',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/admin/productos/productos.module').then(m => m.ProductosModule),
        data: { titulo:'registros', roles: [Roles.Administrador]}
      },
      {
        path: 'registros',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/modules/rms/registros/registros.module').then(m => m.RegistrosModule),
        data: { titulo:'registros', roles: [Roles.Operador, Roles.Supervisor]}
      }

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
