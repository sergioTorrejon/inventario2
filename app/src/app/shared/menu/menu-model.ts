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

const MENUITEMS: any =
[
  {
    state: '',
    name: 'Administrador',
    type: 'sub',
    icon: 'settings',
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
  },
  {
    state: 'consultas',
    name: 'Reportes',
    type: 'link',
    icon: 'manage_search',
    role : [Roles.Consulta, Roles.Administrador],
    children: []
  },
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
      
        return MENUITEMS;
    }
}
