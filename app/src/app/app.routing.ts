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
        loadChildren: () => import('./modules/00-dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      
      
      //PRODUCTOS
      {
        path: 'productos',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/00-dashboard/01--admin/productos/productos.module').then(m => m.ProductosModule),
        data: { titulo:'registros', roles: [Roles.Administrador]}
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
