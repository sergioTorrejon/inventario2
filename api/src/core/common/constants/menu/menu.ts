import { Roles } from 'src/core/auth/enums/roles.enum';

export const MENUITEMS: any =
[
  {
    state: 'consultas',
    name: 'Consultas',
    type: 'link',
    icon: 'manage_search',
    role : [Roles.consulta, Roles.Administrador],
    children: []
  },
  {
    state: '',
    name: 'Administrador',
    type: 'sub',
    icon: 'settings',
    role : [Roles.Administrador],
    children: [
      { state: 'productos', name: 'Productos', type: 'link' },
      { state: 'registros', name: 'Registros ', type: 'link' },
    ]
  },

  {
    state: '',
    name: 'Operador',
    type: 'sub',
    icon: 'settings',
    role : [Roles.Operador, Roles.Supervisor],
    children: [
      { state: 'registros', name: 'Registros ', type: 'link' },
    ]
  },
];