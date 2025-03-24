export const MODEL = {
    name:'productos',
    title:'PRODUCTOS',
    avatar:'assets/images/img/documentos1.jpg',

    columnsTable:
    [
      {name:'codigo', label:'Codigo', width:10},
      {name:'categoria', label:'Categoria',  width:10},
      {name:'marca', label:'Marca',  width:20},
      {name:'modelo', label:'Modelo',  width:15},
      {name:'medida', label:'Medida',  width:20},
      {name:'descripcion', label:'Descripción',  width:15},
    ],

    formControl:
      {
        tipoEmpresa:[''],
        codEmpresa:[''],
        estado:[''],
        tipoCargo:[''],
        fechaIngreso:[''],
        cargo:[''],
        nroIdentificacion:[''],
        nombres:[''],
        apellidos:['']
      },


    data:[],
    count:0,
    dataOptions:[]


}

export const queryGetData = ( dto: any ) =>{
    const res =
    (dto.tipoEmpresa === ''? ``: `&tipoEmpresa=${dto.tipoEmpresa}`) +
    (dto.nombreEmpresa === ''? ``: `&nombreEmpresa=${dto.nombreEmpresa}`)
    return res;
}
