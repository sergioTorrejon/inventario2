import { Injectable } from '@angular/core';

import { Roles } from 'src/app/authentication/guard/roles';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    role?: string[]; /* new */
    type?: string;
    child?: SubChildren[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    role?: string[]; /* new */
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

export const MENUITEMS: any =
[  
  {
    state: 'dashboard',
    name: 'Inicio',
    type: 'link',
    icon: 'home',
    role : [],
    children: []
  },
  {
    state: '',
    name: 'Admin',
    type: 'sub',
    icon: 'settings',
    role : [Roles.Administrador],
    children: [
      { state: 'settings', name: 'Configuraciòn', type: 'link' },
      { state: 'personas', name: 'Categorias', type: 'link' },
      { state: 'solicitudes', name: 'Catalogos', type: 'link' },
    ]
  },
/*   {
    state: '',
    name: '',
    type: 'sub',
    icon: '',
    role : [Roles.Administrador],
    children: [
      { state: 'empresas', name: 'Productos', type: 'link' },
      { state: 'personas', name: 'Almacenes', type: 'link' },
      { state: 'solicitudes', name: 'Productos', type: 'link' },
    ]
  },  
  {
    state: '',
    name: 'ALMACENES',
    type: 'sub',
    icon: 'settings',
    role : [Roles.Administrador, Roles.Operador, Roles.Supervisor],
    children: [
      { state: 'registros', name: 'Registros ', type: 'link' },
    ]
  }, */

];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
      
        return MENUITEMS;
    }
}
