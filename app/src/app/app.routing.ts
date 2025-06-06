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
          redirectTo: '/dashboard',
          pathMatch: 'full'
      },


      //ADMIN
      {
        path: 'settings',
        //canActivate: [AuthGuard],
        loadChildren: () => import('./modules/01-admin/01-settings/settings.module').then(m => m.SettingsModule)
      },      

      
      //CONSULTAS
      {
        path: 'dashboard',
        //canActivate: [AuthGuard],
        loadChildren: () => import('./modules/00-dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      
      
      //PRODUCTOS
      {
        path: 'productos',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/02-data/productos/productos.module').then(m => m.ProductosModule),
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
