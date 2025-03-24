export const REGISTROS = {
    name:'empresa',
    cardTitle:'REGISTROS INHABILITACIONES',
    columnsOperador:
    [
      {name:'nro_identificacion', label:'Nro. Identificación',  width:10},
      {name:'nombre_completo', label:'Nombre Completo',  width:20},
      {name:'tipo_cargo', label:'Tipo de Cargo',  width:10},
      {name:'cargo', label:'Cargo',  width:20},
      {name:'fecha_ingreso_format', label:'Fecha de ingreso',  width:10},
      {name:'estado', label:'Estado', width:10},
    ],

    columns:
    [
      {name:'nombre_empresa', label:'Empresa',  width:20},
      {name:'nro_identificacion', label:'Nro. Identificación',  width:10},
      {name:'nombre_completo', label:'Nombre Completo',  width:10},
      {name:'tipo_cargo', label:'Tipo de Cargo',  width:10},
      {name:'cargo', label:'Cargo',  width:10},
      {name:'fecha_ingreso_format', label:'Fecha de ingreso',  width:10},
      {name:'estado', label:'Estado', width:10},
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
