export const MODEL = {
    name:'settings',
    title:'Settings',
    avatar:'assets/images/img/documentos1.jpg',

    columnsTable:
    [
      {name:'codigo', label:'Codigo', width:10},
      {name:'categoria', label:'Categoria',  width:10},
      {name:'marca', label:'Marca',  width:10},
      {name:'medida', label:'Medida',  width:20},
      {name:'modelo', label:'Modelo',  width:20},
      {name:'descripcion', label:'Descripción',  width:20},
    ],

    formControl:
      {
        categoria:[''],
        marca:[''],
        modelo:[''],
        medida:[''],
        descripcion:['']
      },


    data:[],
    count:0,
    dataOptions:[]


}

export const tipoCategoriaProducto = [
    {value:"motocicleta",label:'Motocicleta'},
    {value:"Automovil",label:'Automovil'},
    {value:"Agropecuario",label:'Agropecuario'}
  ]

export const marcasProducto = [
    {value:"Michelin",label:'Michelin'},
    {value:"Goodyear",label:'Goodyear'},
    {value:"Pirelli",label:'Pirelli'},
    {value:"Dunlop",label:'Dunlop'},
    {value:"Continental",label:'Continental'}
  ]
 

  export const medidasProducto = [
    {value:"113 16/9",label:'113 16/9'},
    {value:"15 8/8",label:'15 8/8'},
  ]
 






