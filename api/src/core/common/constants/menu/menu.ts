import { Roles } from 'src/core/auth/enums/roles.enum';

export const MENUITEMS: any =
[
  {
    state: '',
    name: 'Administrador',
    type: 'sub',
    icon: 'settings',
    role : [Roles.Administrador],
    children: [
      { state: 'provedores', name: 'Provedores', type: 'link' },
      { state: 'solicitudes', name: 'Almacenes', type: 'link' },
      { state: 'personas', name: 'productos', type: 'link' },
    ]
  },

  {
    state: '',
    name: 'Inventario',
    type: 'sub',
    icon: 'settings',
    role : [Roles.Administrador, Roles.OperadorFuncionarios, Roles.AprobadorFuncionarios],
    children: [
      { state: 'registros', name: 'Registros ', type: 'link' },
    ]
  },

  {
    state: 'consultas',
    name: 'Reportes',
    type: 'link',
    icon: 'manage_search',
    role : [Roles.ConsultaFuncionarios, Roles.Administrador],
    children: []
  },
];